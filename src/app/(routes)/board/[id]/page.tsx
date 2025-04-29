"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useGetFullWrite from "@/hooks/useGetFullWrite";

// 📀 COMPONENT
import Inner from "@/components/ui/Inner";
import ContentTop from "@/components/board/ContentTop";
import ContentMid from "@/components/board/ContentMid";
import ContentBot from "@/components/board/ContentBot";
import BoardViewLoadComponent from "@/components/spinner/BoardViewLoadComponent";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function BoardViewPage() {
    const { writeData, isLoad, isError, setWriteData } = useGetFullWrite();
    const params = useParams();

    useEffect(() => {
        if(Array.isArray(writeData)){
            const filtered = [...writeData]?.filter(data => data._id === params.id)[0];
            setWriteData(filtered);
        }
    }, [writeData]);

    if(isLoad) return <BoardViewLoadComponent/>;
    if(isError) return <ErrorMessage text={'게시물을 불러오는 중 에러가 발생하였습니다.'}/>

    return (
        <div className="BoardViewPage sub-page">
            <Inner x={"center"} y={"column"}>
                <div className="board-content blur-box">
                    <ContentTop
                        title={writeData?.title}
                        likeNum={writeData?.likeNum}
                        commentNum={writeData?.comment?.length ?? 0}
                        writer={writeData?.writer}
                        date={writeData?.date}
                        id={writeData?._id}
                    />
                    <ContentMid content={writeData?.content} />
                    <ContentBot comment={writeData?.comment} />
                </div>
            </Inner>
        </div>
    );
}