import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const db = (await connectDB).db('IdolRank');
        const collection = db.collection('group');

        const { searchParams } = new URL(req.url);
        const full = searchParams.get("full");

        const projection = full === "true"
            ? {}
            : { nameEn: 1, };

        const group = await collection.find({}, {projection}).toArray();

        return NextResponse.json({
            success: true,
            data: group,
        });
    }
    catch(e){
        return NextResponse.json({
            success: false,
            error: e instanceof Error ? e.message : 'Unknown Error',
        })
    }
}