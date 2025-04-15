import Link from "next/link";

interface Board {
    [key: string]: string;
}

export default function Board({ category, recentList, likeList }) {
    return (
        <table className="board">
            <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일시</th>
                    <th>추천수</th>
                </tr>
            </thead>
            <tbody>
                {
                    category 
                        ? (
                            recentList.map((list, i) => (
                                <tr key={list._id}>
                                    <td className="title-td">
                                        <Link href={`/board/${list._id}`}>
                                            <span className="title">{list.title}</span>
                                            <span className="comment-num">
                                                [ {list.commentNum} ]
                                            </span>
                                        </Link>
                                    </td>
                                    <td>{list.writer}</td>
                                    <td>{list.date}</td>
                                    <td className="like-num">{list.likeNum}</td>
                                </tr>
                            ))
                        )
                        : (
                            likeList.map((list, i) => (
                                <tr key={list._id}>
                                    <td className="title-td">
                                        <Link href={`/board/${list._id}`}>
                                            <span className="title">{list.title}</span>
                                            <span className="comment-num">
                                                [ {list.commentNum} ]
                                            </span>
                                        </Link>
                                    </td>
                                    <td>{list.writer}</td>
                                    <td>{list.date}</td>
                                    <td className="like-num">{list.likeNum}</td>
                                </tr>
                            ))
                        )
                }
            </tbody>
        </table>
    );
}
