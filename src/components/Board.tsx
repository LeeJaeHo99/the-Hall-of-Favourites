import Link from 'next/link';
interface Board {
    [key: string]: string;
}

export default function Board({list}) {
    const sortedList = list.reverse();
    console.log('sortedList: ', sortedList);

    return (
        <table className="board">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일시</th>
                    <th>추천수</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedList.map((list, i) => (
                        <tr key={list._id}>
                            <td>{i + 1}</td>
                            <td className='title-td'>
                                <Link href={`/board/${list._id}`}>
                                    <span className="title">{list.title}</span>
                                    <span className="comment-num">[ {list.commentNum} ]</span>
                                </Link>
                            </td>
                            <td>{list.writer}</td>
                            <td>{list.date}</td>
                            <td className="like-num">{list.likeNum}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
