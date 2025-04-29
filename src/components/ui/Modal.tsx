"use client";

import useDeleteCommnet from "@/hooks/useDeleteCommnet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Modal({ param, index }) {
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

    const { deleteHandler, loadDeleteComment, errorDeleteComment } = useDeleteCommnet();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await deleteHandler(param, index, inputPw);

        if (!errorDeleteComment) {
            window.location.reload();
        } else {
            alert(errorDeleteComment);
        }
    };

    return (
        <div className="modal-wrap blur-box">
            <div className="calcel-btn">
                <Image
                    src={"/icons/x-white.png"}
                    width={8}
                    height={8}
                    alt="x버튼 아이콘"
                />
            </div>
            <div>
                삭제를 원하시면
                <br />
                비밀번호 4자리를 입력해주세요.
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
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