import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const body = await req.json();
        const { id, title, content, writer, pw } = body;

        if (!id || !title || !content || !writer || !pw) {
            return NextResponse.json(
                { message: "모든 필드를 입력해주세요." },
                { status: 400 }
            );
        }

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    title,
                    content,
                    writer,
                    pw,
                },
            }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "수정된 내용이 없거나 존재하지 않는 글입니다." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "게시글 수정 성공", data: {result} },
            { status: 200 }
        );
    } catch (error) {
        console.error("글 수정 중 에러:", error);

        return NextResponse.json(
            { message: "서버 에러 발생" },
            { status: 500 }
        );
    }
}
