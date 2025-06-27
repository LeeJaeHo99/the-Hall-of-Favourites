import { connectDB } from "@/util/mongodb"; 
import { NextResponse } from "next/server";

export async function PATCH() {
    const client = await connectDB;
    const db = client.db("IdolRank");
    const collection = db.collection("member");

    const KR_HOUR = new Date().getHours();
    const CRON_HOUR = (new Date().getUTCHours() + 9) % 24;
    const targetIndex = CRON_HOUR + 1;

    const members = await collection.find({}).toArray();
    
    
    if (members.length === 0) {
        return NextResponse.json({ status: "error", message: "No members found" });
    }
    const sortedMembers = members.sort((a, b) => b.likeHistory - a.likeHistory);
    
    const top5Members = sortedMembers.slice(0, 5);
    const bottom5Members = sortedMembers.slice(-5);

    const bulkOps = members.map((member) => {
        let increment: number;

        function getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        const isTop5 = top5Members.some(topMember => topMember._id.toString() === member._id.toString());
        const isBottom5 = bottom5Members.some(bottomMember => bottomMember._id.toString() === member._id.toString());
        
        if (isTop5) {
            if(KR_HOUR > 2 && KR_HOUR < 8){
                increment = getRandomInt(10, 25);
            }else{
                increment = getRandomInt(30, 50);
            }
        } else if (isBottom5) {
            if(KR_HOUR > 2 && KR_HOUR < 8){
                increment = getRandomInt(0, 10);
            }else{
                increment = getRandomInt(10, 40);
            }
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
