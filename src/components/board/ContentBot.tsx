"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Modal from "@/components/Modal";

export default function ContentBot({ comment }) {
    const params = useParams();

    const [commentWriter, setCommentWriter] = useState("");
    const onChangeWriter = (e) => {
        setCommentWriter(e.target.value);
    };
    const [commentPw, setCommentPw] = useState("");
    const onChangePw = (e) => {
        setCommentPw(e.target.value);
    };
    const [commentText, setCommentText] = useState("");
    const onChangeComment = (e) => {
        setCommentText(e.target.value);
    };

    const [isClickDelete, setIsClickDelete] = useState(null);
    const onClickDelete = (i) => {
        setIsClickDelete(null);
        setIsClickDelete(i);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/postComment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        postId: params.id,
                        name: commentWriter,
                        text: commentText,
                        pw: commentPw,
                    }),
                }
            );
            if (response.ok) {
                setCommentWriter("");
                setCommentPw("");
                setCommentText("");
            }
        } catch (e) {
            console.error(e);
        }
        window.location.reload();
    };

    const onKeyDownEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
            window.location.reload();
        }
    };

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
                        {comment?.length > 0 ? (
                            comment?.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.text}</td>
                                    <td>
                                        {isClickDelete === i && (
                                            <Modal
                                                param={params.id}
                                                index={i}
                                                clickDeleteBtn={() => {
                                                    onClickDelete(null);
                                                }}
                                            />
                                        )}
                                        <button
                                            onClick={() => {
                                                onClickDelete(i);
                                            }}
                                        >
                                            <Image
                                                src={"/icons/x-gray.png"}
                                                width={8}
                                                height={8}
                                                alt="삭제 아이콘"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <NoneComment />
                        )}
                    </tbody>
                </table>
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <div className="info-wrap">
                    <label htmlFor="comment-id">
                        <span>닉네임 </span>
                        <input
                            value={commentWriter}
                            onChange={onChangeWriter}
                            type="text"
                            id="comment-id"
                            placeholder="6글자 이내"
                            maxLength={6}
                            required
                        />
                    </label>
                    <label htmlFor="comment-pw">
                        <span>비밀번호 </span>
                        <input
                            value={commentPw}
                            onChange={onChangePw}
                            type="password"
                            id="comment-pw"
                            placeholder="4자리"
                            maxLength={4}
                            required
                        />
                    </label>
                </div>
                <div className="write-wrap">
                    <textarea
                        value={commentText}
                        onChange={onChangeComment}
                        onKeyDown={onKeyDownEnter}
                        placeholder="댓글을 입력해주세요."
                        maxLength={60}
                        required
                    />
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

function NoneComment() {
    return (
        <tr>
            <td></td>
            <td className="none-comment">댓글이 없습니다.</td>
            <td></td>
        </tr>
    );
}