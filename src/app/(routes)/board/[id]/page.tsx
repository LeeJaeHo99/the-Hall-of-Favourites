"use client";

import { useState } from "react";
import Title from "@/components/Title";
import Inner from "@/components/Inner";

export default function Board() {
    const [category, setCategory] = useState(true);
    const clickNew = () => {
        setCategory(true);
    };
    const clickPopular = () => {
        setCategory(false);
    };

    return (
        <div className="BoardPage">
            <Inner x={"column"} y={"center"}>
                <Title title={"자유 게시판"} />
                <Category category={category} clickNew={clickNew} clickPopular={clickPopular}/>
            </Inner>
        </div>
    );
}

function Category({category, clickNew, clickPopular}) {
    return (
        <div className="category-right">
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
        </div>
    );
}
