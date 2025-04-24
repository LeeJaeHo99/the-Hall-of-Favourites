import Link from "next/link";

interface Board {
    [key: string]: string;
}

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

function BoardHead() {
    const headText = ['제목', '작성자', '작성일시', '추천수'];
    return (
        <tr>
            {headText.map(text => <th key={text}>{text}</th>)}
        </tr>
    );
}

function BoardTr({ list }) {
    return (
        <tr>
            <td className="title-td">
                <Link href={`/board/${list._id}`}>
                    <span className="title">{list.title}</span>
                    <span className="comment-num">
                        [ {list.comment.length} ]
                    </span>
                </Link>
            </td>
            <td>{list.writer}</td>
            <td>{list.date}</td>
            <td className="like-num">{list.likeNum}</td>
        </tr>
    );
}

function NoneSearchWord(){
    return(
        <tr>
            <td className="no-search">검색결과가 없습니다.</td>
        </tr>
    )
}