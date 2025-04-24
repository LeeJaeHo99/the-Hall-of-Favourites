import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

// 🤖 WORK : 동일 IP에 대해 1일1회 좋아요 가능
const getUserIdentifier = (req: Request) => {
    const forwarded = req.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",")[0] : "anonymous";
};

export async function PATCH(req: Request) {
    const now = new Date();
    const isSaturday = now.getDay() === 6;
    const addLikeNum = isSaturday ? 2 : 1;

    const { searchParams } = new URL(req.url);
    const nameKo = searchParams.get("q");

    if (!nameKo) {
        return NextResponse.json(
            { message: "nameKo가 필요합니다." },
            { status: 400 }
        );
    }

    const userId = getUserIdentifier(req);
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    try {
        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("member");

        const member = await collection.findOne({ "nameKo.0": nameKo });

        if (!member) {
            return NextResponse.json(
                { message: "해당 멤버를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        // 🤖 WORK : 좋아요 중복 체크
        const alreadyLiked = member.likeRecord?.some(
            (record: { date: string; user: string }) =>
                record.date === todayKey && record.user === userId
        );
        if (alreadyLiked) {
            return NextResponse.json(
                { message: "오늘은 이미 좋아요를 눌렀습니다." },
                { status: 403 }
            );
        }

        const now = new Date();
        const hour = now.getHours();
        const todayLikeIndex = hour;

        if (!member.todayLike || member.todayLike.length < 24) {
            const todayLike = Array(24).fill(0);
            if (member.todayLike) {
                member.todayLike.forEach((val, idx) => todayLike[idx] = val);
            }
            await collection.updateOne(
                { "nameKo.0": nameKo },
                { $set: { todayLike } }
            );
        }

        const result = await collection.updateOne(
            { "nameKo.0": nameKo },
            {
                $inc: {
                    [`todayLike.${todayLikeIndex}`]: addLikeNum,
                    likeHistory: addLikeNum,
                },
                $push: {
                    likeRecord: { date: todayKey, user: userId },
                },
            }
        );

        return NextResponse.json(
            { message: "좋아요 성공", result },
            { status: 200 }
        );
    } catch (err) {
        console.error("좋아요 에러:", err);
        return NextResponse.json(
            { message: "서버 에러 발생" },
            { status: 500 }
        );
    }
}
