"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useDeleteCommnet from "@/hooks/useDeleteComment";
import useGetWrite from "@/hooks/useGetWrite";
import { DeleteCommentModalPropstype } from '@/types/types';
import Image from "next/image";

export default function DeleteCommentModal({ onClickDelete, param, index }: DeleteCommentModalPropstype) {
    console.log('param: ', param);
    console.log('index: ', index);
    const { recentWrite, setRecentWrite } = useGetWrite();
    const { deleteHandler } = useDeleteCommnet();

    const params = useParams();
    const inputRef = useRef(null);
    const [inputPw, setInputPw] = useState("");
    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPw(e.target.value);
    };

    const closeModal = () => {
        onClickDelete(null);
    }

    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).focus();
        }
    }, []);

    useEffect(() => {
        if(Array.isArray(recentWrite)){
            const finded = [...recentWrite]?.find(data => data._id === params.id);
            if(finded) setRecentWrite(finded);
        }
    }, [recentWrite, setRecentWrite, params.id]);

    const onSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(inputPw.length !== 4){
            alert('비밀번호를 입력해주세요');
            return;
        }
        
        const result = await deleteHandler(param, index, inputPw);

        if (result === 'success') {
            window.location.reload();
        } else {
            alert('삭제가 실패하였습니다.');
        }
    }

    return (
        <div className="modal-wrap blur-box">
            <div className="calcel-btn" onClick={closeModal}>
                <Image
                    src={"/icons/x-white.png"}
                    width={8}
                    height={8}
                    alt="x버튼 아이콘"
                />
            </div>
            <div className="text-wrap">
                삭제를 원하시면
                <br />
                비밀번호 4자리를 입력해주세요.
            </div>
            <form className="modal-form" onSubmit={onSubmitDelete}>
                <input
                    ref={inputRef}
                    value={inputPw}
                    onChange={onChangePw}
                    type="password"
                    placeholder="4자리"
                    maxLength={4}
                    required
                />
                <button type="submit">삭제</button>
            </form>
        </div>
    );
}