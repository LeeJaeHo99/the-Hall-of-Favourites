"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import usePostLikePost from "@/hooks/usePostLikePost";
import LoadSpinner from "../spinner/LoadSpinner";

export default function ContentMid({ content, clickLike }: { content: string, clickLike: () => void }) {
    const params = useParams();
    const { postHandler, isPost } = usePostLikePost();

    const handleLike = async () => {
        try {
            const result = await postHandler(params.id as string);

            if (!result) {
                alert("추천 실패");
                return;
            }

            if (result.data) {
                clickLike();
            } else {
                alert("이미 추천한 게시물 입니다.");
            }
        } 
        catch (e) {
            console.error("추천 중 오류 발생:", e);
            alert("추천 중 오류 발생");
        }
    };

    if(isPost) return <LoadSpinner/>;

    return (
        <div className="content-mid">
            <p>{content}</p>
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