import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const db = (await connectDB).db('IdolRank');
        const collection = db.collection('group');

        const member = await collection.find({}).toArray();

        return NextResponse.json({
            success: true,
            data: member,
        });
    }
    catch(e){
        return NextResponse.json({
            success: false,
            error: e instanceof Error ? e.message : 'Unknown Error',
        })
    }
}