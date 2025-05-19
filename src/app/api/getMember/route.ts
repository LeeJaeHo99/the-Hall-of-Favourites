import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        const db = (await connectDB).db('IdolRank');
        const collection = db.collection('member');

        const { searchParams } = new URL(req.url);
        const full = searchParams.get("full");

        const projection = full === "true"
            ? {}
            : { nameKo: 1, };

        const member = await collection.find({}, { projection }).toArray();

        return NextResponse.json({
            success: true,
            data: member,
        });
    }
    catch(e){
        return NextResponse.json({
            success: false,
            error: e instanceof Error ? e.message : 'Unknown Error',
        });
    }
}