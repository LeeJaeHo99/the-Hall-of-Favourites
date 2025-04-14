"use client";

import { useState, useEffect, Suspense } from "react";
import Title from "@/components/Title";
import Inner from "@/components/Inner";
import Board from "@/components/Board";
import BoardSkeleton from '@/components/skeleton/BoardPreviewSkeleton';

export default function BoardPage() {
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };

    const [writeList, setWriteList] = useState([]);

    useEffect(() => {
        const fetchWriteData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`
            );
            const writeData = await response.json();
            console.log("writeData: ", writeData.data);
            setWriteList(writeData.data);
        };
        fetchWriteData();
    }, []);

    return (
        <div className="BoardPage sub-page">
            <Inner x={"column"} y={"center"}>
                <div className="title-left">
                    <Title title={"자유 게시판"} />
                </div>
                <div className="board-content--wrap blur-box">
                    <Category
                        category={category}
                        clickNew={clickNew}
                        clickPopular={clickPopular}
                    />
                    <Suspense fallback={<BoardSkeleton/>}>
                        <Board list={writeList} />
                    </Suspense>
                </div>
            </Inner>
        </div>
    );
}

function Category({ category, clickNew, clickPopular }) {
    return (
        <div className="category-right">
            <div className="category-wrap">
                <p className={`${category && "selected"}`} onClick={clickNew}>
                    최신글
                </p>
                <p
                    className={`${category || "selected"}`}
                    onClick={clickPopular}
                >
                    인기글
                </p>
            </div>
        </div>
    );
}
