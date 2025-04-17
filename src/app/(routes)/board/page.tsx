"use client";

import { useState, useEffect } from "react";
import { usePagination } from '@/store/store';
import Image from 'next/image';
import Link from "next/link";
import Title from "@/components/Title";
import Inner from "@/components/Inner";
import Board from "@/components/Board";
import Pagination from '@/components/Pagination';
import Category from "@/components/Category";

export default function BoardPage() {
    const { pagination, setPagination } = usePagination();
    const [category, setCategory] = useState(true);

    const clickNew = () => {
        setPagination(0);
        setCategory(true);
    };

    const clickPopular = () => {
        setPagination(0);
        setCategory(false);
    };

    const [writeList, setWriteList] = useState([]);

    useEffect(() => {
        const fetchWriteData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`);
            const writeData = await response.json();
            setWriteList(writeData.data);
        };
        fetchWriteData();
    }, []);
    
    // 최신순
    const [recentWrite, setRecentWrite] = useState([]);
    // 인기순
    const [likeSortedWrite, setLikeSortedWrite] = useState([]);

    useEffect(() => {
        setRecentWrite([...writeList].reverse().slice(pagination * 7, (pagination + 1) * 7));
        setLikeSortedWrite([...writeList].sort((a, b) => {
            let aList = Number(a.likeNum);
            let bList = Number(b.likeNum);
            return bList - aList;
        }).slice(pagination * 7, (pagination + 1) * 7));
    }, [writeList, pagination]);

    return (
        <div className="BoardPage sub-page">
            <Inner x={"column"} y={"center"}>
                <div className="title-left">
                    <Title title={"자유 게시판"} />
                </div>
                <div className="board-content--wrap blur-box">
                    <div className="board-editor">
                        <div className="board-component--wrap">
                            <BoardWrite />
                            <BoardSearch/>
                        </div>
                        <Category
                            category={category}
                            clickLeft={clickNew}
                            clickRight={clickPopular}
                            leftText={'최신글'}
                            rightText={'인기순'}
                        />
                    </div>
                    <Board
                        category={category}
                        recentWrite={...recentWrite}
                        likeSortedWrite={...likeSortedWrite}
                    />
                    <Pagination data={...writeList} pagination={pagination} setPagination={setPagination}/>
                </div>
            </Inner>
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

function BoardSearch(){
    return(
        <div className="board-search--component">
            <input type="text" placeholder="검색어를 입력해주세요."/>
            <button>
                <Image src={'/icons/search.png'} width={16} height={16} alt="검색 아이콘"/>
            </button>
        </div>
    );
}