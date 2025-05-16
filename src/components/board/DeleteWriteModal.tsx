"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { WriteDataType } from '@/types/types';
import useDeleteWrite from "@/hooks/useDeleteWrite";
import useGetWrite from "@/hooks/useGetWrite";
import Image from "next/image";

export default function DeleteWriteModal({ onClick }: {onClick: () => void}) {
    const { recentWrite, setRecentWrite } = useGetWrite();
    const { deleteHandler } = useDeleteWrite();
    const router = useRouter();
    const params = useParams();

    const inputRef = useRef(null);
    const [inputPw, setInputPw] = useState("");
    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPw(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement)?.focus();
        }
    }, []);

    useEffect(() => {
        if(Array.isArray(recentWrite)){
            const finded = [...recentWrite]?.find(data => data._id === params.id);
            setRecentWrite((finded as WriteDataType));
        }
    }, [recentWrite, setRecentWrite, params.id]);


    const onSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(inputPw === ''){
            alert('비밀번호를 입력해주세요');
            return;
        }
        const result = await deleteHandler((recentWrite as WriteDataType)?._id, inputPw);

        if (result === 'success') {
            alert("게시글이 삭제되었습니다.");
            router.push('/board');
        } else {
            alert('게시물 삭제가 실패하였습니다.');
        }
    }

    return (
        <div className="modal-wrap blur-box">
            <div className="calcel-btn" onClick={onClick}>
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