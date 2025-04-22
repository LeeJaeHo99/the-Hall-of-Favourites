"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Modal({ onClick }) {
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

    const [writeData, setWriteData] = useState([]);

    useEffect(() => {
        const fetchWriteData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getWrite`);
            const result = await response.json();
    
            setWriteData(result?.data.filter(data => data._id === params.id)[0]);
        };
        fetchWriteData();
    }, [])


    const onSubmitDelete = async (e) => {
        e.preventDefault();
        if(inputPw === ''){
            alert('비밀번호를 입력해주세요');
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteWrite?postId=${writeData?._id}&inputPw=${inputPw}`, {
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