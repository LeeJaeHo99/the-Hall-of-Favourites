"use client";

import { useState, useEffect } from "react";
import { usePagination } from "@/store/store";
import Title from "@/components/ui/Title";
import Inner from "@/components/ui/Inner";
import Board from "@/components/board/Board";
import Pagination from "@/components/board/Pagination";
import Category from "@/components/ui/Category";
import BoardEdit from "@/components/board/BoardEdit";
import ErrorMessage from "@/components/ui/ErrorMessage";
import BoardSearch from "@/components/board/BoardSearch";

export default function BoardPage() {
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState(false);

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
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`);
                if(!res.ok){
                    throw new Error('네트워크 오류가 발생하였습니다.');
                }
                const writeData = await res.json();
                setWriteList(writeData.data);
            }
            catch(e){
                console.error(e);
                setIsError(true);
            }
            finally{
                // setIsLoad(false);
            }
        };
        fetchWriteData();
    }, []);

    // 🤖 WORK : isSearch === True && searchWord의 텍스트를 searchList에 filter 해서 넣음
    const [searchWord, setSearchWord] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchList, setSearchList] = useState([]);

    const onChangeSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    // 🤖 WORK : isSearch 데이터 변경시 searchList 데이터도 변경
    useEffect(() => {
        setSearchList(writeList.filter(write => write.title.includes(searchWord)));
    }, [isSearch])

    // 최신순
    const [recentWrite, setRecentWrite] = useState([]);
    // 인기순
    const [likeSortedWrite, setLikeSortedWrite] = useState([]);

    // 최신순, 인기순으로 데이터 수정
    useEffect(() => {
        setRecentWrite(
            [...writeList].reverse().slice(pagination * 7, (pagination + 1) * 7)
        );
        setLikeSortedWrite(
            [...writeList]
                .sort((a, b) => {
                    let aList = Number(a.likeNum);
                    let bList = Number(b.likeNum);
                    return bList - aList;
                })
                .slice(pagination * 7, (pagination + 1) * 7)
        );
    }, [writeList, pagination]);

    // if(isLoad) return <Spinner/>;
    if(isError) return <ErrorMessage text={'게시물을 불러오는 중 에러가 발생하였습니다.'}/>

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
                            <BoardSearch searchWord={searchWord} onChangeSearchWord={onChangeSearchWord} isSearch={isSearch} setIsSearch={setIsSearch}/>
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
                        data={...writeList}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            </Inner>
        </div>
    );
}