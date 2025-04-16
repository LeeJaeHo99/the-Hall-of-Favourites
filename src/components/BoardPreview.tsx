"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import BoardSkeleton from "./skeleton/BoardPreviewSkeleton";
import Category from "@/components/Category";

export default function BoardPreview() {
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };

    const [writeList, setWriteList] = useState([]);
    const [recentWrite, setRecentWrite] = useState([]);
    const [likeSortedWrite, setLikeSortedWrite] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite`);
            const writeData = await response.json();
            setWriteList(writeData.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setRecentWrite([...writeList].reverse().slice(0, 5));
        setLikeSortedWrite(
            [...writeList]
                .sort((a, b) => Number(b.likeNum) - Number(a.likeNum))
                .slice(0, 5)
        );
    }, [writeList]);

    console.log('category: ', category);
    console.log('recentWrite: ', recentWrite);
    console.log('likeSortedWrite: ', likeSortedWrite);

    return (
        <div className="board-preview blur-box">
            <Category
                category={category}
                clickLeft={clickNew}
                clickRight={clickPopular}
                leftText={"최신순"}
                rightText={"인기순"}
            />
            <div className="writing-wrap">
                <Suspense fallback={<BoardSkeleton />}>
                    {
                        category ? (
                            recentWrite.length > 0 ? (
                                // 최신순 (category === T)
                                recentWrite.map((write) => (
                                <BoardContent key={write._id} {...write} />
                                ))
                            ) : <BoardSkeleton /> 
                        ) : (
                            likeSortedWrite.length > 0 ? (
                                // 인기순 (category === F)
                                likeSortedWrite.map((write) => (
                                <BoardContent key={write._id} {...write} />
                                ))
                            ) : <BoardSkeleton />
                        )
                    }
                </Suspense>
            </div>
        </div>
    );
}

function BoardContent({ _id, title, date, commentNum, likeNum }) {
    return (
        <Link href={`/board/${_id}`} className="writing">
            <div className="title">
                <span>{title}</span>
                <div className="comment-num">[ {commentNum} ]</div>
            </div>
            <div className="date">{date}</div>
        </Link>
    );
}
