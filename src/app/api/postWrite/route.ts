import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req){
    const body = await req.json();
    const {title, content, name, pw} = body;

    if (!title || !content || !name || !pw) {
        return NextResponse.json(
            { message: "컨텐츠를 입력하세요." },
            { status: 400 }
        );
    }

    const db = (await connectDB).db('IdolRank');
    const collection = db.collection('write');

    const result = await collection.insertOne({
        { _id: new ObjectId(postId) },
        { $push: {} }
    })
}

// 지금 다른 데이터들이 없는데 괜찮은지