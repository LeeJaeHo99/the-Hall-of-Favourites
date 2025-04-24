import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const db = (await connectDB).db('IdolRank');
        const collection = db.collection('notice');

        const notice = await collection.find({}).toArray();

        return NextResponse.json({
            success: true,
            data: notice,
        });
    }
    catch(e){
        return NextResponse.json({
            success: false,
            error: e instanceof Error ? e.message : '에러가 발생하였습니다.',
        });
    }
}