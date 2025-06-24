"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WriteDataType, Comment } from "@/types/types";
import useGetFullWrite from "@/hooks/useGetFullWrite";
import Inner from "@/components/ui/Inner";
import ContentTop from "@/components/board/ContentTop";
import ContentMid from "@/components/board/ContentMid";
import ContentBot from "@/components/board/ContentBot";
import BoardViewLoadComponent from "@/components/spinner/BoardViewLoadComponent";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function BoardViewPage() {
    const { writeData, isLoad, isError, setWriteData } = useGetFullWrite();

    const params = useParams();
    const [likeNumState, setLikeNumState] = useState(0);
    const [commentNumState, setCommentNumState] = useState(0);
    const clickLike = () => {
        setLikeNumState(likeNumState + 1);
    }
    const addComment = () => {
        setCommentNumState(commentNumState + 1);
    }
    
    useEffect(() => {
        if(Array.isArray(writeData)){
            const filtered = [...writeData]?.filter(data => data._id === params.id)[0];
            setWriteData(filtered);
        }
    }, [writeData, params.id, setWriteData]);

    if(isLoad) return <BoardViewLoadComponent/>;
    if(isError) return <ErrorMessage text={'게시물을 불러오는 중 에러가 발생하였습니다.'}/>

    return (
        <div className="BoardViewPage sub-page">
            <Inner x={"center"} y={"column"}>
                <div className="board-content blur-box">
                    <ContentTop
                        title={(writeData as WriteDataType)?.title}
                        likeNum={(writeData as WriteDataType)?.likeNum}
                        commentNum={(writeData as WriteDataType)?.comment?.length ?? 0}
                        writer={(writeData as WriteDataType)?.writer}
                        date={(writeData as WriteDataType)?.date}
                        id={(writeData as WriteDataType)?._id}
                        likeNumState={likeNumState}
                        setLikeNumState={setLikeNumState}
                        commentNumState={commentNumState}
                        setCommentNumState={setCommentNumState}
                        pw={(writeData as WriteDataType)?.pw}
                    />
                    <ContentMid content={(writeData as WriteDataType)?.content} clickLike={clickLike}/>
                    <ContentBot comment={(writeData as WriteDataType)?.comment as unknown as Comment[]} addComment={addComment}/>
                </div>
            </Inner>
        </div>
    );
}