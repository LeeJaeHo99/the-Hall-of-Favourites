"use client";

import { useState } from "react";
import useGetWrite from "@/hooks/useGetWrite";
import { WriteType } from '@/types/types';
import Link from "next/link";
import Category from "@/components/ui/Category";
import BoardPreLoadComponent from "../spinner/BoardPreLoadComponent";
import ErrorMessage from "./ErrorMessage";

export default function BoardPreview() {
    const { recentWrite, likeSortedWrite, isLoad, isError } = useGetWrite();
    
    const [category, setCategory] = useState(true);
    const clickNew = () => {setCategory(true);};
    const clickPopular = () => {setCategory(false);};

    if(isLoad) return <BoardPreLoadComponent/>
    if(isError) return <ErrorMessage text={'개시물을 불러오던중 발생하였습니다.'}/>

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
                    {
                        category
                            ? (Array.isArray(recentWrite) ? recentWrite : [recentWrite])?.map((write: WriteType) => <BoardContent key={write._id} {...write} />)
                            : (Array.isArray(likeSortedWrite) ? likeSortedWrite : [likeSortedWrite])?.map((write: WriteType) => <BoardContent key={write._id} {...write} />)
                    }
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