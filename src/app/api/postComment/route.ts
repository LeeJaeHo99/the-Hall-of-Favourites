import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { Comment, Record } from "@/types/types";
import { Document, UpdateFilter } from "mongodb";

interface WriteDataType extends Document {
    _id: string;
    title: string;
    writer: string;
    pw: string;
    comment: Comment[];
    date: string;
    likeNum: number;
    record: Record[];
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { postId, name, text, pw } = body;

        if (!postId || !name || !pw || !text) {
            return NextResponse.json(
                { message: "댓글, 닉네임, 비밀번호를 입력하세요." },
                { status: 400 }
            );
        }

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const result = await collection.updateOne(
            { _id: new ObjectId(postId) },
            { $push: { comment: { name, text, pw } } } as unknown as UpdateFilter<WriteDataType>
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "해당 게시글을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "성공적으로 저장되었습니다.",
            data: { name, pw, text },
        });
    } catch (e) {
        return NextResponse.json(
            { message: "서버 오류 발생", error: (e as Error).message },
            { status: 500 }
        );
    }
}
