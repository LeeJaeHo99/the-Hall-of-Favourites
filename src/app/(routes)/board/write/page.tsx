"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Inner from "@/components/ui/Inner";
import { InputLabel, TextAreaLabel, SubmitBtn } from "@/components/board/WriteComponents";
import usePostWrite from "@/hooks/usePostWrite";

export default function BoardWritePage() {
    return (
        <div className="BoardWritePage sub-page">
            <Inner x="center" y="column">
                <BoardWrite />
            </Inner>
        </div>
    );
}

function BoardWrite() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const [content, setContent] = useState("");
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    const [writer, setWriter] = useState("");
    const onChangeWriter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWriter(e.target.value);
    };
    const [pw, setPw] = useState("");
    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
    };

    const { postHandler } = usePostWrite();
    
    const onSubmitWrite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!title || !content || !writer || !pw) {
                alert("모든 항목을 입력해 주세요.");
                return;
            }

            const result = await postHandler(title, content, writer, pw);

            if (!result) {
                alert("게시글 작성 실패");
                return;
            }

            if (result) {
                router.push(`/board/${result.result.insertedId}`);
            } else {
                const error = await result.json();
                alert(error.error);
            }
        } catch (e) {
            console.error("게시글 작성 실패:", e);
        }

        setTitle("");
        setContent("");
        setWriter("");
        setPw("");
    };

    return (
        <form onSubmit={onSubmitWrite}>
            <InputLabel
                id={"writeTitle"}
                title={"제목"}
                value={title}
                onChange={onChangeTitle}
                placeHolder={"제목을 적어주세요. (최대 20글자)"}
                length={20}
                type={"text"}
            />
            <TextAreaLabel
                id={"writeContent"}
                title={"내용"}
                value={content}
                onChange={onChangeContent}
                placeHolder={"내용을 입력해 주세요 (최대 180글자)"}
                length={180}
            />
            <InputLabel
                id={"writeName"}
                title={"작성자"}
                value={writer}
                onChange={onChangeWriter}
                placeHolder={"닉네임을 적어주세요 (최대 6글자)"}
                length={6}
                type={"text"}
            />
            <InputLabel
                id={"writePw"}
                title={"비밀번호"}
                value={pw}
                onChange={onChangePw}
                placeHolder={"게시글 삭제, 수정시 이용됩니다. (4글자)"}
                length={4}
                type={"password"}
            />
            <SubmitBtn/>
        </form>
    );
}