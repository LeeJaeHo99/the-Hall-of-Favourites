import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("member");
        
        const result = await collection.updateMany(
            {},
            { $set: { weekLike: [] } }
        );
        
        return NextResponse.json(
            { 
                message: "주간 초기화 완료",
                modifiedCount: result.modifiedCount 
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("주간 초기화 에러:", err);
        return NextResponse.json(
            { message: "서버 에러 발생" },
            { status: 500 }
        );
    }
}
