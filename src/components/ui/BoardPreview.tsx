"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Category from "@/components/ui/Category";
import BoardSkeleton from "../skeleton/BoardPreviewSkeleton";
import ErrorMessage from "./ErrorMessage";

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
            let writeData = [];
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite`);

                if(!res.ok){
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }

                writeData = await res.json();
                setWriteList(writeData.data);
            }
            catch(e){
                console.error('게시글 데이터를 불러오는데 오류가 발생하였습니다.', e);
                return <ErrorMessage text={'게시글 데이터를 불러오는데 오류가 발생하였습니다.'}/>
            }
        };
        fetchData();
    }, []);

    // 🤖 WORK : 최신순 / 인기순 state에 각각 데이터 추가
    useEffect(() => {
        setRecentWrite([...writeList].reverse().slice(0, 5));
        setLikeSortedWrite(
            [...writeList]
                .sort((a, b) => Number(b.likeNum) - Number(a.likeNum))
                .slice(0, 5)
        );
    }, [writeList]);

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
                                recentWrite.map((write) => <BoardContent key={write._id} {...write} />)
                            ) : <BoardSkeleton /> 
                        ) : (
                            likeSortedWrite.length > 0 ? (
                                // 인기순 (category === F)
                                likeSortedWrite.map((write) => <BoardContent key={write._id} {...write} />)
                            ) : <BoardSkeleton />
                        )
                    }
                </Suspense>
            </div>
        </div>
    );
}

function BoardContent({ _id, title, date, comment, likeNum }) {
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