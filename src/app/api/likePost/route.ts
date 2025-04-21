import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.ip;
        const { postId } = await req.json();
        const twentyFourHours = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const result = await collection.updateOne(
            {
                _id: new ObjectId(postId),
                $or: [
                    { record: { $exists: false } },
                    {
                        record: {
                            $not: {
                                $elemMatch: {
                                    ip: clientIP,
                                    date: { $gte: twentyFourHours },
                                },
                            },
                        },
                    },
                ],
            },
            {
                $inc: { likeNum: 1 },
                $push: {
                    record: {
                        $each: [{ ip: clientIP, date: new Date() }],
                        $slice: -300,
                    },
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "게시글당 하루에 한번만 추천 가능합니다." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { message: "추천되었습니다", newCount: result.modifiedCount },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
