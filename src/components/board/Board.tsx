import { BoardHead, BoardTr, NoneSearchWord } from "./BoardComponent";

export default function Board({
    category,
    recentWrite,
    likeSortedWrite,
    isSearch,
    searchList,
}) {
    return (
        <table className="board">
            <thead>
                <BoardHead/>
            </thead>
            <tbody>
                {isSearch 
                    ? (
                    searchList?.length > 0 
                        ? searchList?.map((list) => <BoardTr key={list._id} list={list} />) // 검색 결과
                        : <NoneSearchWord/>
                    ) 
                    : category 
                        ? recentWrite?.map((list) => <BoardTr key={list._id} list={list} />) // 최신순
                        : likeSortedWrite?.map((list) => <BoardTr key={list._id} list={list} />) // 인기순
                }
            </tbody>
        </table>
    );
}

