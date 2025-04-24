'use client';

import { useEffect, useState } from "react";

export default function NoticeModal(){
    const [isNotice, setIsNotice] = useState();
    console.log(isNotice)

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
            {isNotice && <NoticeComponent title={isNotice?.title} content={isNotice?.content}/>}
        </>
    );
}

function NoticeComponent(){
    return(
        <div>
            <h3>{title}</h3>
            <h3>{content}</h3>
        </div>
    )
}