import { connectDB } from "@/util/mongodb"; 
import { NextResponse } from "next/server";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function PATCH() {
    const client = await connectDB;
    const db = client.db("IdolRank");
    const collection = db.collection("member");

    const hour = (new Date().getUTCHours() + 9) % 24;
    const targetIndex = hour + 1;

    const members = await collection.find({}).toArray();
    
    
    if (members.length === 0) {
        return NextResponse.json({ status: "error", message: "No members found" });
    }
    const sortedMembers = members.sort((a, b) => b.likeHistory - a.likeHistory);
    
    const top5Members = sortedMembers.slice(0, 5);
    const bottom5Members = sortedMembers.slice(-5);

    const bulkOps = members.map((member) => {
        let increment: number;
        
        const isTop5 = top5Members.some(topMember => topMember._id.toString() === member._id.toString());
        const isBottom5 = bottom5Members.some(bottomMember => bottomMember._id.toString() === member._id.toString());
        
        if (isTop5) {
            increment = getRandomInt(30, 150);
        } else if (isBottom5) {
            increment = getRandomInt(10, 29);
        } else {
            const isHighTier = Math.random() < 0.5;
            increment = isHighTier ? getRandomInt(30, 50) : getRandomInt(10, 30);
        }

        const todayLike = Array.isArray(member.todayLike)
            ? member.todayLike.slice()
            : Array(25).fill(0);
        
        while (todayLike.length < 25) {
            todayLike.push(0);
        }
        
        if (todayLike.length < targetIndex + 1) {
            while (todayLike.length <= targetIndex) {
                todayLike.push(0);
            }
        }

        todayLike[targetIndex] += increment;
        
        if (member._id.toString() === members[0]._id.toString()) {
            console.log(`Member: ${member.nameEn}, Increment: ${increment}, Target Index: ${targetIndex}, New Value: ${todayLike[targetIndex]}`);
        }

        return {
            updateOne: {
                filter: { _id: member._id },
                update: { $set: { todayLike } },
            },
        };
    });

    console.log(`Created ${bulkOps.length} bulk operations`);

    if (bulkOps.length > 0) {
        const result = await collection.bulkWrite(bulkOps);
        console.log(`Bulk write result:`, result);
        return NextResponse.json({ 
            status: "success", 
            updated: result.modifiedCount || bulkOps.length,
            totalMembers: members.length,
            targetIndex: targetIndex
        });
    }

    return NextResponse.json({ status: "success", updated: 0, message: "No operations to perform" });
}
