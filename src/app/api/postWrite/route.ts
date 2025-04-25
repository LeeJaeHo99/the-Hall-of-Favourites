import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, content, writer, pw } = body;

        if (!title || !content || !writer || !pw) {
            return NextResponse.json(
                { message: "모든 필드를 입력해주세요." },
                { status: 400 }
            );
        }

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const result = await collection.insertOne({
            _id: new ObjectId(),
            title,
            content,
            writer,
            pw,
            date: new Date().toISOString().slice(2, 10).replace(/-/g, "-"),
            likeNum: 0,
            comment: [],
            record: [],
        });

        return NextResponse.json(
            { message: "게시글 등록 성공", data: {result} },
            { status: 201 }
        );
    } catch (error) {
        console.error("글 등록 중 에러:", error);
        return NextResponse.json(
            { message: "서버 에러 발생" },
            { status: 500 }
        );
    }
}
