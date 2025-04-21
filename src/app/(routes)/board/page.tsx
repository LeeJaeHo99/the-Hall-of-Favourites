"use client";

import { useState, useEffect } from "react";
import { usePagination } from "@/store/store";
import Image from "next/image";
import Title from "@/components/Title";
import Inner from "@/components/Inner";
import Board from "@/components/Board";
import Pagination from "@/components/Pagination";
import Category from "@/components/Category";
import BoardEdit from "@/components/BoardEdit";

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

    // 글 데이터 fetch
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

    // isSearch가 True 되면 searchWord의 텍스트로 searchList에 filter 해서 넣음
    const [searchWord, setSearchWord] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const onChangeSearchWord = (e) => {
        setSearchWord(e.target.value);
    }
    
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

function BoardSearch({searchWord, onChangeSearchWord, isSearch, setIsSearch}) {
    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            setIsSearch(false);

            setTimeout(() => {
                setIsSearch(true);
            }, 1);
        }
    }
    const onClickBtn = () => {
        setIsSearch(false);

        setTimeout(() => {
            setIsSearch(true);
        }, 1);
    }

    return (
        <div className="board-search--component">
            <input
                value={searchWord}
                onChange={onChangeSearchWord}
                onKeyDown={onKeyDown}
                type="text"
                placeholder="검색어를 입력해주세요."
            />
            <button onClick={onClickBtn}>
                <Image
                    src={"/icons/search.png"}
                    width={16}
                    height={16}
                    alt="검색 아이콘"
                />
            </button>
        </div>
    );
}

// 검색한 제목과 맞는 제목을 찾고 그거의 _id를 /board/${_id} 이렇게 url 이동
