"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Modal({ clickDeleteBtn, param, index }) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `/api/deleteComment?postId=${param}&commentIndex=${index}&inputPw=${inputPw}`,
                { method: "DELETE" }
            );

            if (res.ok) {
                clickDeleteBtn();
                window.location.reload();
            } else {
                throw new Error('네트워크 응답이 올바르지 않습니다');
            }
        } catch (e) {
            console.error("삭제 실패:", e);
            alert('삭제 실패하였습니다. 재시도 부탁드립니다.');
        }
    };

    return (
        <div className="modal-wrap blur-box">
            <div className="calcel-btn" onClick={clickDeleteBtn}>
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