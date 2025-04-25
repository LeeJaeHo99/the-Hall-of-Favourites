"use client";

import useGetWrite from "@/hooks/useGetWrite";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Modal({ onClick }) {
    const { recentWrite, likeSortedWrite, loadWrite, errorWrite, setRecentWrite } = useGetWrite();
    const router = useRouter();
    const params = useParams();

    const inputRef = useRef(null);
    const [inputPw, setInputPw] = useState("");
    const onChangePw = (e) => {
        setInputPw(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if(Array.isArray(recentWrite)){
            const filtered = [...recentWrite]?.filter(data => data._id === params.id)[0];
            setRecentWrite(filtered);
        }
    }, [recentWrite]);
    console.log('recentWrite: ', recentWrite);


    const onSubmitDelete = async (e) => {
        e.preventDefault();
        if(inputPw === ''){
            alert('비밀번호를 입력해주세요');
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteWrite?postId=${recentWrite?._id}&inputPw=${inputPw}`, {
            method: 'DELETE',}
        );

        if (res.ok) {
            alert("게시글이 삭제되었습니다.");
            router.push('/board');
        } else {
            const error = await res.json();
            alert(error.error);
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