'use client';

import { useState } from "react";
import useGetNotice from "@/hooks/useGetNotice";
import NoticeLoadComponent from "../spinner/NoticeLoadComponent";
import ErrorMessage from "./ErrorMessage";

export default function NoticeModal(){
    const [isNotice, setIsNotice] = useState(true);
    const onClickXBtn = () => {
        setIsNotice(false);
    }
    const { noticeData, isLoad, isError } = useGetNotice();

    if(isLoad) return <NoticeLoadComponent/>;
    if(isError) return <ErrorMessage text={"공지사항을 불러오는데 오류가 발생하였습니다."}/>

    return(
        <>
            {isNotice && <NoticeComponent onClick={onClickXBtn} title={noticeData?.title} content={noticeData?.content}/>}
        </>
    );
}

interface NoticeComponentPropsType{
    onClick: () => void;
    title?: string;
    content?: string;
}

function NoticeComponent({onClick, title, content}: NoticeComponentPropsType){
    return(
        <div className="notice-modal">
            <div className="x-btn" onClick={onClick}>X</div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}