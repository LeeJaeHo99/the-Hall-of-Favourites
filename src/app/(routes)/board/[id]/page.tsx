"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Inner from "@/components/ui/Inner";
import ContentTop from "@/components/board/ContentTop";
import ContentMid from "@/components/board/ContentMid";
import ContentBot from "@/components/board/ContentBot";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function BoardViewPage() {
    const params = useParams();

    const [writeData, setWriteData] = useState();

    useEffect(() => {
        const fetchWriteData = async () => {
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`);
    
                if(!response.ok){
                    throw new Error('네트워크 오류가 발생하였습니다.');
                }
    
                const fetchedData = await response.json();
                setWriteData(
                    fetchedData.data.filter((data) => data._id === params.id)[0]
                );
            }
            catch(e){
                console.error(e);
                return <ErrorMessage text={"게시물 정보를 불러 오던중 에러가 발생하였습니다."}/>;
            }
        };
        fetchWriteData();
    }, []);

    return (
        <div className="BoardViewPage sub-page">
            <Inner x={"center"} y={"column"}>
                <div className="board-content blur-box">
                    <ContentTop
                        title={writeData?.title}
                        likeNum={writeData?.likeNum}
                        commentNum={writeData?.comment.length}
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