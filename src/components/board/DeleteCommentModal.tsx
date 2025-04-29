"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useDeleteCommnet from "@/hooks/useDeleteComment";
import useGetWrite from "@/hooks/useGetWrite";
import { DeleteCommentModalPropstype } from '@/types/types';

// 📀 COMPONENT
import Image from "next/image";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadSpinner from "../spinner/LoadSpinner";

export default function DeleteCommentModal({ setIsClickDelete, param, index }: DeleteCommentModalPropstype) {
    const { recentWrite, likeSortedWrite, isLoad, isError, setRecentWrite } = useGetWrite();
    const { deleteHandler, isDeleteLoad, isDeleteError } = useDeleteCommnet();

    const params = useParams();
    const inputRef = useRef(null);
    const [inputPw, setInputPw] = useState("");
    const onChangePw = (e) => {
        setInputPw(e.target.value);
    };

    const closeModal = () => {
        setIsClickDelete(null);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if(Array.isArray(recentWrite)){
            const finded = [...recentWrite]?.find(data => data._id === params.id);
            setRecentWrite(finded);
        }
    }, [recentWrite]);

    const onSubmitDelete = async (e) => {
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