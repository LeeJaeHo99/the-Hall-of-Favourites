import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("postId");
        const commentIndex = parseInt(searchParams.get("commentIndex") as string);
        const inputPw = searchParams.get("inputPw");

        if (!postId || isNaN(commentIndex) || !inputPw) {
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

        if (commentIndex < 0 || commentIndex >= post.comment.length) {
            return NextResponse.json(
                { error: "유효하지 않은 댓글 번호" },
                { status: 400 }
            );
        }

        if (String(post.comment[commentIndex].pw) !== String(inputPw)) {
            return NextResponse.json(
                { error: "비밀번호가 일치하지 않습니다" },
                { status: 403 }
            );
        }

        const updatedComments = [...post.comment];
        updatedComments.splice(commentIndex, 1);

        await collection.updateOne(
            { _id: new ObjectId(postId) },
            { $set: { comment: updatedComments } }
        );

        return NextResponse.json(
            { 
                message: "댓글이 삭제되었습니다",
                data: 'success'
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}