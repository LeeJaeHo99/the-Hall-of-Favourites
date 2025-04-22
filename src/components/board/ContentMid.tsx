"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {ContentMidProps} from "@/types/types";

export default function ContentMid({ content }: ContentMidProps) {
    const params = useParams();

    const handleLike = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/likePost`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postId: params.id }),
                }
            );

            if (res.ok) {
                alert("게시글이 추천되었습니다.");
            } else {
                const error = await res.json();
                alert(error.error);
            }
        } catch (e) {
            console.error("추천 실패:", e);
        }
        window.location.reload();
    };
    return (
        <div className="content-mid">
            {content}
            <div className="like-wrap">
                <div onClick={handleLike}>
                    <Image
                        src={"/icons/like.png"}
                        width={40}
                        height={40}
                        alt="좋아요 아이콘"
                    />
                    <span>추천</span>
                </div>
            </div>
        </div>
    );
}