import { connectDB } from "@/util/mongodb";
import { NextResponse } from "next/server";
import { Document, UpdateFilter } from "mongodb";

interface MemberData extends Document {
    _id: string;
    todayLike: number[];
    weekLike: number[];
}

export async function POST() {
    const db = (await connectDB).db("IdolRank");
    const collection = db.collection("member");

    const members = await collection.find({}).toArray();

    let maxLikeSum = 0;
    let maxLikeMemberId = null;

    for (const member of members) {
        let todayLike = member.todayLike;

        if (!todayLike || todayLike.length < 25) {
            const initialized = Array(25).fill(0);
            if (todayLike) {
                todayLike.forEach((val: number, idx: number) => {
                    initialized[idx] = val;
                });
            }
            todayLike = initialized;
        }

        const todayLikeSum = todayLike.reduce((a: number, b: number) => a + b, 0);
        console.log('todayLikeSum: ', todayLikeSum);

        // 가장 큰 todayLikeSum 찾기
        if (todayLikeSum > maxLikeSum) {
            maxLikeSum = todayLikeSum;
            maxLikeMemberId = member._id;
            console.log('maxLikeMemberId: ', maxLikeMemberId);
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
                $inc: {
                    likeHistory: todayLikeSum,
                },
                $set: {
                    todayLike: Array(24).fill(0),
                    beforeLike: todayLikeSum,
                    cheerMsg: [],
                    likeRecord: [],
                },
            } as unknown as UpdateFilter<MemberData>
        );
    }

    // todayLikeSum이 가장 큰 멤버의 likeHistory +1
    if (maxLikeMemberId) {
        await collection.updateOne(
            { _id: maxLikeMemberId },
            {
                $inc: { victory: 1 },
            }
        );
    }

    return NextResponse.json({ message: "모든 멤버 하루 집계 완료 및 좋아요 히스토리 업데이트" });
}