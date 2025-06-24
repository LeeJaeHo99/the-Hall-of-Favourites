"use client";

import Image from "next/image";
import { WriteType } from "../../types/data";

export interface PaginationProps {
    data: WriteType[];
    pagination: number;
    setPagination: (value: number) => void;
}

export default function Pagination({
    data,
    pagination,
    setPagination,
}: PaginationProps) {
    const pageNum = Math.ceil(data?.length / 7);
    const arr = new Array(pageNum).fill(1);

    const plusPagination = () => {
        if (pagination + 1 === pageNum) return;
        setPagination(pagination + 1);
    };
    const minusPagination = () => {
        if (pagination === 0) return;
        setPagination(pagination - 1);
    };

    return (
        <div className="pagination-wrap">
            <div className="move-btn minus-btn" onClick={minusPagination}>
                <Image
                    src={"/icons/arrow.png"}
                    width={24}
                    height={24}
                    alt="이동 화살표"
                />
            </div>
            {arr.map((_, i: number) => (
                <div
                    key={i}
                    className={pagination === i ? "selected blur-box" : ""}
                    onClick={() => setPagination(i)}
                >
                    {i + 1}
                </div>
            ))}
            <div className="move-btn plus-btn" onClick={plusPagination}>
                <Image
                    src={"/icons/arrow.png"}
                    width={24}
                    height={24}
                    alt="이동 화살표"
                />
            </div>
        </div>
    );
}
