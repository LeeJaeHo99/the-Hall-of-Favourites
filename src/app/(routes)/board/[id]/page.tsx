"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Inner from "@/components/Inner";
import Board from "@/components/Board";
import Link from "next/link";
import Image from 'next/image';

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
            setWriteList(writeData.data);
        };
        fetchWriteData();
    }, []);

    // 최신순
    let recentList = [...writeList].reverse();

    // 인기순
    let likeList = [...writeList].sort((a, b) => {
        let aList = Number(a.likeNum);
        let bList = Number(b.likeNum);
        return bList - aList;
    });

    return (
        <div className="BoardPage sub-page">
            <Inner x={"column"} y={"center"}>
                <div className="title-left">
                    <Title title={"자유 게시판"} />
                </div>
                <div className="board-content--wrap blur-box">
                    <div className="board-editor">
                        <BoardWrite />
                        <Category
                            category={category}
                            clickNew={clickNew}
                            clickPopular={clickPopular}
                        />
                    </div>
                    <Board
                        category={category}
                        recentList={...recentList}
                        likeList={...likeList}
                    />
                </div>
            </Inner>
        </div>
    );
}

function Category({ category, clickNew, clickPopular }) {
    return (
        <div className="category-wrap">
            <p className={`${category && "selected"}`} onClick={clickNew}>
                최신글
            </p>
            <p className={`${category || "selected"}`} onClick={clickPopular}>
                인기글
            </p>
        </div>
    );
}

function BoardWrite() {
    return (
        <Link className="board-write--btn blur-box" href={"/board/write"}>
            <Image src={'/icons/write.png'} width={14} height={14} alt='글쓰기 아이콘'/>
            <span>글쓰기</span>
        </Link>
    );
}
