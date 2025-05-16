"use client";

import { useState, useEffect } from "react";
import { usePagination } from "@/store/store";
import useGetFullWrite from "@/hooks/useGetFullWrite";

// 📀 COMPONENT
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import Board from "@/components/board/Board";
import BoardEdit from "@/components/board/BoardEdit";
import BoardSearch from "@/components/board/BoardSearch";
import Category from "@/components/ui/Category";
import Pagination from "@/components/board/Pagination";
import BoardLoadComponet from "@/components/spinner/BoardLoadComponet";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function BoardPage() {
    const { writeData, isLoad, isError}= useGetFullWrite();
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
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchList, setSearchList] = useState([]);

    const onChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
    }

    // 🤖 WORK : isSearch 변경시 searchList 데이터도 변경
    useEffect(() => {
        if(Array.isArray(writeData)){
            setSearchList(writeData?.filter(write => write.title.includes(searchWord)).reverse());
        }
    }, [isSearch]);

    const [recentWrite, setRecentWrite] = useState([]);
    const [likeSortedWrite, setLikeSortedWrite] = useState([]);

    useEffect(() => {
        if(Array.isArray(writeData)){
            const recentData = [...writeData]?.reverse().slice(pagination * 7, (pagination + 1) * 7);
            setRecentWrite(recentData);

        const likeSortedData = [...writeData]
            ?.sort((a, b) => {
                let aList = Number(a.likeNum);
                let bList = Number(b.likeNum);
                return bList - aList;
            }).slice(pagination * 7, (pagination + 1) * 7);
            setLikeSortedWrite(likeSortedData);
        }
    }, [writeData, pagination]);

    if(isLoad) return <BoardLoadComponet/>;
    if(isError) return <ErrorMessage text={'게시물을 불러오는 중 에러가 발생하였습니다.'}/>;

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
                                setIsSearch={setIsSearch}
                            />
                        </div>
                        {
                            !isSearch && (
                                <Category
                                    category={category}
                                    clickLeft={clickNew}
                                    clickRight={clickPopular}
                                    leftText={"최신글"}
                                    rightText={"인기순"}
                                />
                            )
                        }
                    </div>
                    <Board
                        category={category}
                        recentWrite={...recentWrite}
                        likeSortedWrite={...likeSortedWrite}
                        isSearch={isSearch}
                        searchList={searchList}
                    />
                    {
                        !isSearch && (
                            <Pagination
                                data={...writeData}
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                        )
                    }
                </div>
            </Inner>
        </div>
    );
}