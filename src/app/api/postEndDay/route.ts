import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const nameKo = searchParams.get("q");

    const db = (await connectDB).db("IdolRank");
    const collection = db.collection("member");
    const member = await collection.findOne({ "nameKo.0": nameKo });

    // 🤖 WORK : 없는 멤버일 경우 중단
    if (!member) {
        return NextResponse.json(
            { message: "멤버를 찾을 수 없습니다" },
            { status: 404 }
        );
    }

    if (!member.todayLike || member.todayLike.length < 24) {
        const initialized = Array(24).fill(0);
        if (member.todayLike) {
            member.todayLike.forEach((val, idx) => initialized[idx] = val);
        }
        await collection.updateOne(
            { "nameKo.0": nameKo },
            { $set: { todayLike: initialized } }
        );
    }

    const todayLikeSum = member.todayLike.reduce((a, b) => a + b, 0);

    await collection.updateOne(
        { "nameKo.0": nameKo },
        {
            $push: {
                weekLike: {
                    $each: [todayLikeSum],
                    $slice: -6
                }
            },
            $set: { todayLike: Array(24).fill(0) }
        }
    );

    return NextResponse.json({ message: "하루 집계 완료" });
}