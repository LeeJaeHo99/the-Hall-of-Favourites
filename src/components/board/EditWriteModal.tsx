"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditWriteModal({ onClick, link, pw }: {onClick: () => void, link: string, pw: string }) {
    console.log('link: ', link);
    const [inputPw, setInputPw] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement)?.focus();
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPw(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputPw === pw) {
            router.push(`/board/${link}`);
        }else{
            alert("비밀번호가 일치하지 않습니다.");
            inputRef.current?.focus();
        }
    };
    return (
        <div className="modal-wrap edit-modal-wrap blur-box">
            <div className="calcel-btn" onClick={onClick}>
                <Image
                    src={"/icons/x-white.png"}
                    width={8}
                    height={8}
                    alt="x버튼 아이콘"
                />
            </div>
            <div className="text-wrap">
                수정을 원하시면
                <br />
                비밀번호 4자리를 입력해주세요.
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="4자리"
                    maxLength={4}
                    required
                    ref={inputRef}
                    onChange={handleInputChange}
                />
                <button type="submit">확인</button>
            </form>
        </div>
    );
}