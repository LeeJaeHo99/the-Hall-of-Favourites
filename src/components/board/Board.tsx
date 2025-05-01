import { BoardPropsType, BoardTrPropsType } from "@/types/types";
import Link from "next/link";

export default function Board({
    category,
    recentWrite,
    likeSortedWrite,
    isSearch,
    searchList,
}: BoardPropsType) {
    return (
        <div className="board-component">
            {
                isSearch 
                ? (
                    searchList.length > 0 
                    ? searchList?.map(list => <BoardLine key={list._id} list={list} />) // 검색 결과
                    : <NoneSearch />
                ) 
                : category 
                    ? recentWrite?.map(list => <BoardLine key={list._id} list={list} />) // 최신순
                    : likeSortedWrite?.map(list => <BoardLine key={list._id} list={list} />) // 인기순
            }
        </div>
    );
}

function BoardLine({list}: BoardTrPropsType) {
    return (
        <div>
            <Link href={`/board/${list._id}`} className="title">
                <p>{list.title}</p>
                <div className="comment-num">[ {list.comment.length ?? 0} ]</div>
            </Link>
            <div>
                <div className="writer">{list.writer} / </div>
                <div className="date">{list.date} / </div>
                <div className="like-num">{list.likeNum}</div>
            </div>
        </div>
    );
}

function NoneSearch() {
    return <div className="none-searched">검색어가 존재하지 않습니다...</div>;
}
