"use client";

import { useState } from "react";
import Inner from "@/components/Inner";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const [content, setContent] = useState("");
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };
    const [writer, setWriter] = useState("");
    const onChangeWriter = (e) => {
        setWriter(e.target.value);
    };
    const [pw, setPw] = useState("");
    const onChangePw = (e) => {
        setPw(e.target.value);
    };
    
    const onSubmitWrite = async (e) => {
        e.preventDefault();

        try{
            if (!title || !content || !writer || !pw) {
                alert("모든 항목을 입력해 주세요.");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postWrite`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    content: content,
                    writer: writer,
                    pw: pw,
                })
            });

            const data = await res.json();

            if(res.ok){
                alert('게시글이 작성이 완료되었습니다.');
                router.push(`/board/${data.result.insertedId}`);
            } else {
                const error = await res.json();
                alert(error.error);
            }
        }
        catch(e){
            console.error("게시글 작성 실패:", e);
        }

        setTitle('');
        setContent('');
        setWriter('');
        setPw('');
    }
    const onKeyDownEnter = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            onSubmitWrite();
        }
    }

    return (
        <form onSubmit={onSubmitWrite} onKeyDown={onKeyDownEnter}>
            <label htmlFor="writeTitle" className="blur-box">
                <span>제목</span>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    type="text"
                    id="writeTitle"
                    maxLength={20}
                    placeholder="제목을 적어주세요. (최대 20글자)"
                />
            </label>
            <label htmlFor="writeContent" className="blur-box">
                <span>내용</span>
                <textarea
                    value={content}
                    onChange={onChangeContent}
                    id="writeContent"
                    maxLength={180}
                    placeholder="내용을 입력해 주세요 (최대 180글자)"
                ></textarea>
            </label>
            <label htmlFor="writeName" className="blur-box">
                <span>작성자</span>
                <input
                    value={writer}
                    onChange={onChangeWriter}
                    type="text"
                    id="writeName"
                    maxLength={6}
                    placeholder="닉네임을 적어주세요 (최대 6글자)"
                />
            </label>
            <label htmlFor="writePw" className="blur-box">
                <span>비밀번호</span>
                <input
                    value={pw}
                    onChange={onChangePw}
                    type="password"
                    id="writePw"
                    maxLength={4}
                    placeholder="게시글 삭제, 수정시 이용됩니다. (4글자)"
                />
            </label>
            <div>
                <button type="submit" className="submit-btn">
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
    );
}