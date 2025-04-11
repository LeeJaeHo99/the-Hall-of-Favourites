"use client";

import { useState } from "react";
import Link from "next/link";

export default function BoardPreview() {
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };

    return (
        <div className="board-preview">
            <div className="category-wrap">
                <p className={`${category && "selected"}`} onClick={clickNew}>
                    최신글
                </p>
                <p
                    className={`${category || "selected"}`}
                    onClick={clickPopular}
                >
                    인기글
                </p>
            </div>
            <div className="writing-wrap">
                <Link href={"/"} className="writing">
                    <div className="title">
                        <span>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</span>
                        <div className="comment-num">[ 3 ]</div>
                    </div>
                    <div className="date">2025-04-19</div>
                </Link>
                <Link href={"/"} className="writing">
                    <div className="title">
                        <span>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하</span>
                        <div className="comment-num">[ 3 ]</div>
                    </div>
                    <div className="date">2025-04-19</div>
                </Link>
                <Link href={"/"} className="writing">
                    <div className="title">
                        <span>안녕하세요안녕하세요안녕하세요안녕하세요</span>
                        <div className="comment-num">[ 3 ]</div>
                    </div>
                    <div className="date">2025-04-19</div>
                </Link>
                <Link href={"/"} className="writing">
                    <div className="title">
                        <span>안녕하세요안</span>
                        <div className="comment-num">[ 3 ]</div>
                    </div>
                    <div className="date">2025-04-19</div>
                </Link>
                <Link href={"/"} className="writing">
                    <div className="title">
                        <span>안녕하</span>
                        <div className="comment-num">[ 3 ]</div>
                    </div>
                    <div className="date">2025-04-19</div>
                </Link>
            
            </div>
        </div>
    );
}
