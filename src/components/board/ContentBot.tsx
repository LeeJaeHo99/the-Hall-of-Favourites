"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import usePostComment from "@/hooks/usePostComment";
import { CommentType } from '@/types/types';

// 📀 COMPONENT
import Image from "next/image";
import DeleteCommentModal from "./DeleteCommentModal";
import ErrorMessage from "../ui/ErrorMessage";
import LoadSpinner from "@/components/spinner/LoadSpinner";

export default function ContentBot({ comment }: CommentType) {
    const { postHandler, isPost, isPostError } = usePostComment();
    const params = useParams();
    const id = params.id;

    const [name, setName] = useState("");
    const onChangeWriter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const [pw, setPw] = useState("");
    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
    };
    const [text, setText] = useState("");
    const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [isClickDelete, setIsClickDelete] = useState<number | null>(null);
    const onClickDelete = (i: number | null) => {
        setIsClickDelete(i);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const result = await postHandler({id, name, text, pw});
            
            if (result) {
                setName("");
                setPw("");
                setText("");
            }else{
                throw new Error('네트워크 오류가 발생하였습니다.');
            }
        }
        catch (e) {
            console.error(e);
            return <ErrorMessage text={'댓글 작성 중 오류가 발생하였습니다.'}/>;
        }
        window.location.reload();
    };

    const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
            window.location.reload();
        }
    };

    if(isPost) return <LoadSpinner/>;
    if(isPostError) return <ErrorMessage text={"댓글 작성중 에러가 발생하였습니다."}/>;

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
                        {Array.isArray(comment) && comment?.length > 0 ? (
                            comment?.map((data: CommentType, i: number) => (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.text}</td>
                                    <td>
                                        {isClickDelete === i && (
                                            <DeleteCommentModal
                                                setIsClickDelete={setIsClickDelete}
                                                param={params.id}
                                                index={i}
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
                        ) : <NoneComment />}
                    </tbody>
                </table>
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <div className="info-wrap">
                    <label htmlFor="comment-id">
                        <span>닉네임 </span>
                        <input
                            value={name}
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
                            value={pw}
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
                        value={text}
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