import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
    const db = (await connectDB).db("IdolRank");
    const collection = db.collection("member");

    const members = await collection.find({}).toArray();

    let maxLikeSum = 0;
    let maxLikeMemberId = null;

    for (const member of members) {
        let todayLike = member.todayLike;

        if (!todayLike || todayLike.length < 24) {
            const initialized = Array(24).fill(0);
            if (todayLike) {
                todayLike.forEach((val, idx) => {
                    initialized[idx] = val;
                });
            }
            todayLike = initialized;
        }

        const todayLikeSum = todayLike.reduce((a, b) => a + b, 0);

        // 가장 큰 todayLikeSum 찾기
        if (todayLikeSum > maxLikeSum) {
            maxLikeSum = todayLikeSum;
            maxLikeMemberId = member._id;
        }

        // 주간 집계 및 todayLike 초기화
        await collection.updateOne(
            { _id: member._id },
            {
                $push: {
                    weekLike: {
                        $each: [todayLikeSum],
                        $slice: -6,
                    },
                },
                $set: {
                    todayLike: Array(24).fill(0),
                },
            }
        );
    }

    // todayLikeSum이 가장 큰 멤버의 likeHistory +1
    if (maxLikeMemberId) {
        await collection.updateOne(
            { _id: maxLikeMemberId },
            {
                $inc: { likeHistory: 1 },
            }
        );
    }

    return NextResponse.json({ message: "모든 멤버 하루 집계 완료 및 좋아요 히스토리 업데이트" });
}
