"use client";

import { useState } from "react";
import { BoardDeleteProps, ContentTopProps } from "../../types/types";
import Link from "next/link";
import Image from "next/image";
import BoardEdit from "@/components/board/BoardEdit";
import DeleteWriteModal from "@/components/board/DeleteWriteModal";

export default function ContentTop({
    title,
    likeNum,
    commentNum,
    writer,
    date,
    id,
}: ContentTopProps) {
    const [isModal, setIsModal] = useState(false);
    const onClickDeleteBtn = () => {
        setIsModal((prev) => !prev);
    };

    return (
        <>
            <div className="edit-btn">
                <div className="wrapper">
                    <BoardEdit
                        style={"normal"}
                        text={"글 수정"}
                        link={`/write/${id}`}
                    />
                    <BoardDelete style={"red"} onClick={onClickDeleteBtn} />
                    {isModal && <DeleteWriteModal onClick={onClickDeleteBtn} />}
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
                            추천수: <span>{likeNum}</span>
                        </div>
                        <div className="comment">
                            댓글수: <span>{commentNum}</span>
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
