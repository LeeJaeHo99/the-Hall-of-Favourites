"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import usePostLikePost from "@/hooks/usePostLikePost";

// 📀 COMPONENT
import LoadSpinner from "../spinner/LoadSpinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function ContentMid({ content }) {
    const params = useParams();
    const { postHandler, isPost, isPostError } = usePostLikePost();

    const handleLike = async () => {
        try {
            const result = await postHandler(params.id);

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

    if(isPost) return <LoadSpinner/>;
    if(isPostError) return <ErrorMessage text={"게시물 추천 중 에러가 발생하였습니다."}/>

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