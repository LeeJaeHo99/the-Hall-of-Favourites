"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Category from "@/components/ui/Category";
import BoardSkeleton from "../skeleton/BoardPreviewSkeleton";
import ErrorMessage from "./ErrorMessage";
import useGetWrite from "@/hooks/useGetWrite";
import { WriteType } from '../../types/types';

export default function BoardPreview() {
    const { recentWrite, likeSortedWrite, loading, error } = useGetWrite();
    
    const [category, setCategory] = useState(true);
    const clickNew = () => {setCategory(true);};
    const clickPopular = () => {setCategory(false);};

    if(loading) return <div>loading...</div>
    if(error) return <ErrorMessage text={'개시물을 불러오던중 발생하였습니다.'}/>

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
                        category 
                            ? recentWrite.map((write) => <BoardContent key={write._id} {...write} />) 
                            : likeSortedWrite.map((write) => <BoardContent key={write._id} {...write} />)
                    }
                </Suspense>
            </div>
        </div>
    );
}

function BoardContent({ _id, title, date, comment}: WriteType) {
    return (
        <Link href={`/board/${_id}`} className="writing">
            <div className="title">
                <span>{title}</span>
                <div className="comment-num">[ {comment.length} ]</div>
            </div>
            <div className="date">{date}</div>
        </Link>
    );
}