import Link from "next/link";
import { WriteType } from '../../types/types';

export function BoardHead() {
    const headText = ["제목", "작성자", "작성일시", "추천수"];
    return (
        <tr>
            {headText.map((text) => (
                <th key={text}>{text}</th>
            ))}
        </tr>
    );
}

export function BoardTr({ list }: WriteType) {
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

export function NoneSearchWord() {
    return (
        <tr>
            <td className="no-search">검색결과가 없습니다.</td>
        </tr>
    );
}
