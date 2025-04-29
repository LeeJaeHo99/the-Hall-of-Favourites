"use client";

import { useState, useEffect } from "react";
import Inner from "@/components/ui/Inner";
import { useParams, useRouter } from "next/navigation";
import useGetFullWrite from "@/hooks/useGetFullWrite";
import usePatchWrite from "@/hooks/usePatchWrite";
import LoadSpinner from "@/components/spinner/LoadSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { InputLabel, TextAreaLabel, SubmitBtn } from "@/components/board/WriteComponents";
import { WriteDataType } from '@/types/types';

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
    const { writeData, isLoad, isError}= useGetFullWrite();
    const [selectedWrite, setSelectedWrite] = useState<WriteDataType | null>(null);
    const router = useRouter();
    const params = useParams();

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

    useEffect(() => {
        if (Array.isArray(writeData)) {
            const finded = writeData.find(write => write._id === params?.id?.[0]);
            if (finded) {
                setSelectedWrite(finded);
                
                setTitle(finded.title);
                setContent(finded.content);
                setWriter(finded.writer);
                setPw(finded.pw);
            }
        }
    }, [writeData]);

    const { patchHandler } = usePatchWrite();
    
    const onSubmitEditWrite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content || !writer || !pw) {
            alert("모든 항목을 입력해 주세요.");
            return;
        }

        try{
            await patchHandler({
                id: selectedWrite?._id ?? '',
                title,
                content,
                writer,
                pw,
            })

            alert('게시글이 수정되었습니다');
            router.push(`/board/${selectedWrite?._id ?? ''}`);
        }
        catch (e: unknown) {
            if(e instanceof Error){
                alert("수정 중 오류가 발생했습니다");
            }
        }

        setTitle('');
        setContent('');
        setWriter('');
        setPw('');
    }
    
    if(isLoad) return <LoadSpinner/>;
    if(isError) return <ErrorMessage text={"게시물 데이터를 불러오던 중 오류가 발생하였습니다."}/>

    return (
        <form onSubmit={onSubmitEditWrite}>
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