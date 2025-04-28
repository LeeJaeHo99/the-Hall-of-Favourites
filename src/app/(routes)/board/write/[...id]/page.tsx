"use client";

import { useState, useEffect } from "react";
import Inner from "@/components/ui/Inner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useGetFullWrite from "@/hooks/useGetFullWrite";
import usePatchWrite from "@/hooks/usePatchWrite";

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
    const { writeData, loadFullWrite, errorFullWrite, setWriteData}= useGetFullWrite();
    const router = useRouter();
    const params = useParams();

    const [title, setTitle] = useState('');
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

    useEffect(() => {
        if (Array.isArray(writeData)) {
            const filtered = writeData.filter(write => write._id === params.id[0])[0];
            setWriteData(filtered);
    
            setTitle(filtered?.title ?? '');
            setContent(filtered?.content ?? '');
            setWriter(filtered?.writer ?? '');
            setPw(filtered?.pw ?? '');
        }
    }, [writeData]);

    const { patchHandler, isPatching, patchError } = usePatchWrite();
    
    const onSubmitEditWrite = async (e) => {
        e.preventDefault();

        if (!title || !content || !writer || !pw) {
            alert("모든 항목을 입력해 주세요.");
            return;
        }

        try{
            await patchHandler({
                id: writeData._id,
                title,
                content,
                writer,
                pw,
            })

            alert('게시글이 수정되었습니다');
            router.push(`/board/${writeData._id}`);
        }
        catch (error) {
            alert(patchError || "수정 중 오류가 발생했습니다");
        }

        setTitle('');
        setContent('');
        setWriter('');
        setPw('');
    }
    
    if(loadFullWrite) return <div>123</div>

    return (
        <form onSubmit={onSubmitEditWrite}>
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
                    <span>저장</span>
                </button>
            </div>
        </form>
    );
}