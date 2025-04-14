"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import BoardSkeleton from "./skeleton/BoardPreviewSkeleton";

export default function BoardPreview() {
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };
    
    const [writeList, setWriteList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite`);
            const writeData = await response.json();
            setWriteList(writeData.data);
        };
        fetchData();
    }, []);
    const recentWrite = writeList.reverse().slice(0, 5);

    return (
        <div className="board-preview blur-box">
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
            <div className="writing-wrap">
                <Suspense fallback={<BoardSkeleton />}>
                    {recentWrite.length > 0 
                        ? recentWrite.map((write) => <BoardContent key={write._id} {...write} />)
                        : <BoardSkeleton/>}
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