'use client';

import useGetNotice from "@/hooks/useGetNotice";
import { useEffect, useState } from "react";

export default function NoticeModal(){
    const [isNotice, setIsNotice] = useState();
    const onClickXBtn = () => {
        setIsNotice(false);
    }
    const { noticeData, loadFullNotice, errorFullNotice } = useGetNotice();

    if(loadFullNotice) return <div>로딩</div>
    if(errorFullNotice) return <div>에러</div>

    return(
        <>
            {noticeData && <NoticeComponent onClcick={onClickXBtn} title={noticeData?.title} content={noticeData?.content}/>}
        </>
    );
}

function NoticeComponent({onClcick, title, content}){
    return(
        <div className="notice-modal">
            <div className="x-btn" onClick={onClcick}>X</div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}