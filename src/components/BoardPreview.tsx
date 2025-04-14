"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

export default function BoardPreview() {
    const [noticeList, setNoticeList] = useState([]);
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getNoticePre`
            );
            const result = await response.json();
            console.log("result: ", result.data);
            setNoticeList(result.data);
        };
        fetchData();
    }, []);

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
                    {noticeList.length > 0 
                        ? noticeList.map((notice) => <BoardContent key={notice._id} {...notice} />)
                        : <BoardSkeleton/>}
                </Suspense>
            </div>
        </div>
    );
}

function BoardContent({ _id, title, date, commentNum }) {
    return (
        <Link href={`/notice/${_id}`} className="writing">
            <div className="title">
                <span>{title}</span>
                <div className="comment-num">[ {commentNum} ]</div>
            </div>
            <div className="date">{date}</div>
        </Link>
    );
}

function BoardSkeleton() {
    return (
        <div className="board-preview-skeleton">
            <div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
            <div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
            <div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
            <div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
            <div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
        </div>
    );
}