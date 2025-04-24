'use client';

import { useEffect, useState } from "react";

export default function NoticeModal(){
    const [isNotice, setIsNotice] = useState();
    const onClickXBtn = () => {
        setIsNotice(false);
    }

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getNotice`);
            const result = await res.json();
    
            setIsNotice(result.data[0]);
        }
        fetchNotice();
    }, [])

    return(
        <>
            {isNotice && <NoticeComponent onClcick={onClickXBtn} title={isNotice?.title} content={isNotice?.content}/>}
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