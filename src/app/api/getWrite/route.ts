import { NextResponse } from "next/server";
import { connectDB } from "@/util/mongodb";

export async function GET(req) {
    try {
        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const { searchParams } = new URL(req.url);
        const full = searchParams.get("full");

        const projection = full === "true"
            ? {}
            : { _id: 1, title: 1, comment: 1, date: 1, likeNum: 1, };

        const notice = await collection.find({}, { projection }).toArray();

        return NextResponse.json({
            success: true,
            data: notice,
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            error: e instanceof Error ? e.message : "Unknown Error",
        });
    }
}
