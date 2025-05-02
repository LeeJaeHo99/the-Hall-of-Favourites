import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("postId");
        const inputPw = searchParams.get("inputPw");

        if (!postId || !inputPw) {
            return NextResponse.json(
                { error: "필수 파라미터가 누락되었습니다" },
                { status: 400 }
            );
        }

        const db = (await connectDB).db("IdolRank");
        const collection = db.collection("write");

        const post = await collection.findOne({ _id: new ObjectId(postId) });
        if (!post)
            return NextResponse.json(
                { error: "게시글을 찾을 수 없습니다" },
                { status: 404 }
            );

        if (post.pw !== inputPw) {
            return NextResponse.json(
                { error: "비밀번호가 일치하지 않습니다" },
                { status: 403 }
            );
        }

        await collection.deleteOne({ _id: new ObjectId(postId) });

        return NextResponse.json(
            { 
                message: "게시물이 삭제되었습니다",
                data: 'success'
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
