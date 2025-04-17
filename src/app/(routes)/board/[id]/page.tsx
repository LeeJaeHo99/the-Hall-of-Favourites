"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Inner from "@/components/Inner";

export default function BoardViewPage() {
    const params = useParams();

    const [writeData, setWriteData] = useState();

    useEffect(() => {
        const fetchWriteData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getWrite?full=true`
            );
            const fetchedData = await response.json();
            setWriteData(
                fetchedData.data.filter((data) => data._id === params.id)[0]
            );
        };
        fetchWriteData();
    }, []);
    console.log(writeData);

    return (
        <div className="BoardViewPage sub-page">
            <Inner x={"center"} y={"column"}>
                <div className="board-content blur-box">
                    <ContentTop
                        title={writeData?.title}
                        likeNum={writeData?.likeNum}
                        commentNum={writeData?.comment.length}
                        writer={writeData?.writer}
                        date={writeData?.date}
                    />
                    <ContentMid content={writeData?.content} />
                    <ContentBot comment={writeData?.comment} />
                </div>
            </Inner>
        </div>
    );
}

function ContentTop({ title, likeNum, commentNum, writer, date }) {
    return (
        <div className="content-top">
            <div className="title">{title}</div>
            <div className="data-wrap">
                <div className="like">
                    추천수: <span>{likeNum}</span>
                </div>
                <div className="comment">
                    댓글수: <span>{commentNum}</span>
                </div>
                <div className="writer">
                    작성자: <span>{writer}</span>
                </div>
                <div className="date">
                    작성일: <span>{date}</span>
                </div>
            </div>
        </div>
    );
}

function ContentMid({ content }) {
    return (
        <div className="content-mid">
            {content}
            <div className="like-wrap">
                <div>
                    <Image
                        src={"/icons/like.png"}
                        width={40}
                        height={40}
                        alt="좋아요 아이콘"
                    />
                    <span>추천</span>
                </div>
            </div>
        </div>
    );
}

function ContentBot({ comment }) {
    const [commentWriter, setCommentWriter] = useState("");
    const [commentPw, setCommentPw] = useState("");
    console.log("comment: ", comment);

    return (
        <div className="content-bot">
            <div className="comment-wrap">
                <div className="comment-num">
                    전체댓글 <span>{comment?.length}</span>개
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>내용</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comment?.length > 0
                            ? comment?.map((data, i) => (
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.text}</td>
                                <td>
                                    <button>
                                        <Image src={'/icons/x-gray.png'} width={8} height={8} alt="삭제 아이콘"/>
                                    </button>
                                </td>
                            </tr>
                            ))
                            : <tr>
                                <td></td>
                                <td className="none-comment">댓글이 없습니다.</td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <form>
                <div className="info-wrap">
                    <label htmlFor="comment-id">
                        <span>닉네임 </span>
                        <input
                            type="text"
                            id="comment-id"
                            placeholder="닉네임"
                            required
                        />
                    </label>
                    <label htmlFor="comment-pw">
                        <span>비밀번호 </span>
                        <input
                            type="password"
                            id="comment-pw"
                            placeholder="4자리"
                            required
                        />
                    </label>
                </div>
                <div className="write-wrap">
                    <textarea placeholder="댓글을 입력해주세요." required />
                    <button type="submit">
                        <Image
                            src={"/icons/write.png"}
                            width={16}
                            height={16}
                            alt="글쓰기 아이콘"
                        />
                        <span>작성</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
