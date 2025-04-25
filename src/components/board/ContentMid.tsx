"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import {ContentMidProps} from "@/types/types";
import usePostLikePost from "@/hooks/usePostLikePost";

export default function ContentMid({ content }: ContentMidProps) {
    const params = useParams();
    const { postHandler, loadPostLikePost, errorPostLikePost } = usePostLikePost();

    const handleLike = async () => {
        try {
            const result = await postHandler(params.id);
            console.log('result: ', result);

            if (!result) {
                alert("추천 실패");
                return;
            }

            if (result.newCount) {
                alert("게시글이 추천되었습니다.");
                window.location.reload();
            } else {
                alert("추천 실패");
            }
        } 
        catch (e) {
            console.error("추천 중 오류 발생:", e);
            alert("추천 중 오류 발생");
        }
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