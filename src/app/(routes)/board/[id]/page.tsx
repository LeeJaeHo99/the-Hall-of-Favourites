"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Inner from "@/components/Inner";
import ContentTop from "@/components/board/ContentTop";
import ContentMid from "@/components/board/ContentMid";
import ContentBot from "@/components/board/ContentBot";

export default function BoardViewPage() {
    const params = useParams();

    const [writeData, setWriteData] = useState();

    useEffect(() => {
        const fetchWriteData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`
            );
            const fetchedData = await response.json();
            setWriteData(
                fetchedData.data.filter((data) => data._id === params.id)[0]
            );
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