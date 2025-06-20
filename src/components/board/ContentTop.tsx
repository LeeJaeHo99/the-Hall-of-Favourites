"use client";

import { useState, useEffect } from "react";
import { BoardDeleteProps, ContentTopProps } from "../../types/types";
import Link from "next/link";
import Image from "next/image";
import BoardEdit from "@/components/board/BoardEdit";
import DeleteWriteModal from "@/components/board/DeleteWriteModal";
import EditWriteModal from "@/components/board/EditWriteModal";

export default function ContentTop({
    title,
    likeNum,
    commentNum,
    writer,
    date,
    id,
    likeNumState,
    setLikeNumState,
    commentNumState,
    setCommentNumState,
    pw
}: ContentTopProps) {
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const onClickDeleteBtn = () => {
        setIsDeleteModal((prev) => !prev);
    };
    const [isEditModal, setIsEditModal] = useState(false);
    const onClickEditBtn = () => {
        setIsEditModal((prev) => !prev);
    };

    useEffect(() => {
        setLikeNumState(likeNum);
        setCommentNumState(commentNum);
    }, [likeNum, commentNum, setLikeNumState, setCommentNumState]);
    
    return (
        <>
            <div className="edit-btn">
                <div className="wrapper">
                    <BoardEdit
                        style={"normal"}
                        text={"글 수정"}
                        onClick={onClickEditBtn}
                    />
                    {isEditModal && <EditWriteModal onClick={onClickEditBtn} link={`/write/${id}`} pw={pw}/>}
                    <BoardDelete style={"red"} onClick={onClickDeleteBtn} />
                    {isDeleteModal && <DeleteWriteModal onClick={onClickDeleteBtn} />}
                </div>
                <Link className="to-board" href={"/board"}>
                    게시판 목록으로 이동
                </Link>
            </div>
            <div className="content-top">
                <div className="title">{title}</div>
                <div className="data-wrap">
                    <div>
                        <div className="like">
                            추천수: <span>{likeNumState}</span>
                        </div>
                        <div className="comment">
                            댓글수: <span>{commentNumState}</span>
                        </div>
                    </div>
                    <div>
                        <div className="writer">
                            작성자: <span>{writer}</span>
                        </div>
                        <div className="date">
                            작성일: <span>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function BoardDelete({ style, onClick }: BoardDeleteProps) {
    return (
        <div className={`board-edit--btn blur-box ${style}`} onClick={onClick}>
            <Image
                src={"/icons/write.png"}
                width={14}
                height={14}
                alt="글쓰기 아이콘"
            />
            <span>글 삭제</span>
        </div>
    );
}
