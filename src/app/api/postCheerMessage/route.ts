import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || !text) {
            return NextResponse.json({ message: "응원 메시지를 적어주세요." }, { status: 400 });
        }

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("member");

        const result = await collection.updateOne(
            { "nameKo.0": { $regex: query, $options: "i" } },
            { $push: { cheerMsg: text } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "해당 멤버를 찾을 수 없습니다." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "응원 메시지가 저장되었습니다.", data: { matchedCount: result.matchedCount } },
            { status: 200 }
        );
    } catch (err) {
        console.error("API 오류:", err);
        return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
    }
}