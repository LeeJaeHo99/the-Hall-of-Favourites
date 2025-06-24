import { connectDB } from "@/util/mongodb";
import { Document, UpdateFilter } from "mongodb";
import { NextResponse } from "next/server";

interface LikeRecord {
    date: string;
    user: string;
}

interface MemberDataType extends Document {
    _id: string;
    age: string;
    birth: string;
    company: string;
    debutDate: string;
    group: string[];
    likeHistory: number;
    likeRecord: LikeRecord[];
    nameEn: string;
    nameKo: [string, string];
    song: {
        id: string;
        title: string;
    };
    todayLike: number[];
    victory: number;
    weekLike: number[];
    story?: string[];
    cheerMsg?: string[];
}

// 🤖 WORK : 동일 IP에 한해서 한 멤버에게 1일1회 좋아요 가능
const getUserIdentifier = (req: Request) => {
    const forwarded = req.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",")[0] : "anonymous";
};

export async function PATCH(req: Request) {
    const now = new Date();
    const isSaturday = now.getDay() === 6;
    const incrementValue = isSaturday ? 2 : 1;

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

        // 🤖 WORK : 동일 IP 확인
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

        // 🤖 WORK : 현재 시간에 맞는 인덱스에 좋아요 +1
        const hour = new Date().getHours(); // 0~23
        const todayLikeIndex = hour + 1;

        // 🤖 WORK : 만약 todayLike 배열이 24개가 아니라면 초기화
        if (!member.todayLike || member.todayLike.length < 25) {
            const initialized = Array(25).fill(0);
            if (member.todayLike) {
                member.todayLike.forEach((val: number, idx: number) => initialized[idx] = val);
            }
            await collection.updateOne(
                { "nameKo.0": nameKo },
                { $set: { todayLike: initialized } }
            );
        }

        await collection.updateOne(
            { "nameKo.0": nameKo },
            {
                $inc: {
                    [`todayLike.${todayLikeIndex}`]: incrementValue,
                    // likeHistory: incrementValue,
                },
                $push: {
                    likeRecord: {
                        date: todayKey,
                        user: userId
                    } as LikeRecord
                }
            } as unknown as UpdateFilter<MemberDataType>
        );

        return NextResponse.json(
            { 
                message: "좋아요 성공",
                data: 'success' 
            },
        );
    } catch (err) {
        console.error("좋아요 에러:", err);
        return NextResponse.json(
            { message: "서버 에러 발생" },
        );
    }
}