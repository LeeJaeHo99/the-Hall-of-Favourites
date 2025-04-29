"use client";

import { useState, useEffect } from "react";
import { usePagination } from "@/store/store";

// 📀 COMPONENT
import Title from "@/components/ui/Title";
import Inner from "@/components/ui/Inner";
import Board from "@/components/board/Board";
import Pagination from "@/components/board/Pagination";
import Category from "@/components/ui/Category";
import BoardEdit from "@/components/board/BoardEdit";
import BoardSearch from "@/components/board/BoardSearch";
import ErrorMessage from "@/components/ui/ErrorMessage";
import useGetFullWrite from "@/hooks/useGetFullWrite";
import BoardSkeleton from "@/components/skeleton/Skeleton";

export default function BoardPage() {
    const { writeData, loadFullWrite, errorFullWrite}= useGetFullWrite();
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

    // 🤖 WORK : isSearch === True && searchWord의 텍스트를 searchList에 filter 해서 넣음
    const [searchWord, setSearchWord] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchList, setSearchList] = useState([]);

    const onChangeSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    // 🤖 WORK : isSearch 변경시 searchList 데이터도 변경
    useEffect(() => {
        setSearchList(writeData?.filter(write => write.title.includes(searchWord)));
    }, [isSearch]);

    const [recentWrite, setRecentWrite] = useState([]);
    const [likeSortedWrite, setLikeSortedWrite] = useState([]);

    useEffect(() => {
        setRecentWrite(
            [...writeData]?.reverse().slice(pagination * 7, (pagination + 1) * 7)
        );
        setLikeSortedWrite(
            [...writeData]
                ?.sort((a, b) => {
                    let aList = Number(a.likeNum);
                    let bList = Number(b.likeNum);
                    return bList - aList;
                })
                .slice(pagination * 7, (pagination + 1) * 7)
        );
    }, [writeData, pagination]);

    if(!loadFullWrite) return <BoardSkeleton/>;
    if(errorFullWrite) return <ErrorMessage text={'게시물을 불러오는 중 에러가 발생하였습니다.'}/>

    return (
        <div className="BoardPage sub-page">
            <Inner x={"column"} y={"center"}>
                <div className="title-left">
                    <Title title={"자유 게시판"} />
                </div>
                <div className="board-content--wrap blur-box">
                    <div className="board-editor">
                        <div className="board-component--wrap">
                            <BoardEdit style={'normal'} text={'글쓰기'} link={'write'}/>
                            <BoardSearch 
                                searchWord={searchWord} 
                                onChangeSearchWord={onChangeSearchWord} 
                                isSearch={isSearch} 
                                setIsSearch={setIsSearch}/>
                        </div>
                        <Category
                            category={category}
                            clickLeft={clickNew}
                            clickRight={clickPopular}
                            leftText={"최신글"}
                            rightText={"인기순"}
                        />
                    </div>
                    <Board
                        category={category}
                        recentWrite={...recentWrite}
                        likeSortedWrite={...likeSortedWrite}
                        isSearch={isSearch}
                        searchList={searchList}
                    />
                    <Pagination
                        data={...writeData}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            </Inner>
        </div>
    );
}