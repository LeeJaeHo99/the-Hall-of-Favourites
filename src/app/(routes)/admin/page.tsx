"use client";

import { useState } from "react";
import Inner from "@/components/ui/Inner";
import AdminBtn from "@/components/admin/AdminBtn";
import AdminContent from "@/components/admin/AdminContent";

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(true);
    const onChangePw = () => {
        setIsAdmin(false)
    }
    const [clickIdx, setClickIdx] = useState(0);
    const onClickIdx = (i: number) => {
        setClickIdx(i);
    };

    return (
        <div className="Adminpage sub-page">
            <Inner x="evenly" y="center">
                {isAdmin ? (
                    <AdminInput onChangePw={onChangePw}/>
                ) : (
                    <>
                        <AdminBtn onClick={onClickIdx} selectedIdx={clickIdx} />
                        <AdminContent clickIdx={clickIdx} />
                    </>
                )}
            </Inner>
        </div>
    );
}

function AdminInput({onChangePw}){
    return (
        <div>
            <h2>🔒 비밀번호를 입력하시오 🔒</h2>
            <input type="password" onChange={onChangePw}/>
        </div>
    )
}