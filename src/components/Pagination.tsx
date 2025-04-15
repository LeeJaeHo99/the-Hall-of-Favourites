'use client';

import { usePagination } from "@/store/store";
import Image from "next/image";

export default function Pagination({ data }) {
    const { pagination, setPagination } = usePagination();
    const pageNum = Math.ceil(data.length / 10);
    const arr = new Array(pageNum).fill(1);
    const plusPagination = () => {
        if(!((pagination + 2) === pageNum)) return;
        console.log('plus-pagination: ', pagination);
        setPagination(pagination + 1);
    }
    const minusPagination = () => {
        if(pagination === 0) return;
        console.log('minus-pagination: ', pagination);
        setPagination(pagination - 1);
    }

    return (
        <div className="pagination-wrap">
            <div className="move-btn minus-btn" onClick={minusPagination}>
                <Image src={'/icons/arrow.png'} width={24} height={24} alt='이동 화살표'/>
            </div>
            {arr.map((_, i) => (
                <div
                    key={i}
                    className={pagination === i ? "selected blur-box" : ""}
                    onClick={() => setPagination(i)}
                >
                    {i + 1}
                </div>
            ))}
            <div className="move-btn plus-btn" onClick={plusPagination}>
                <Image src={'/icons/arrow.png'} width={24} height={24} alt='이동 화살표'/>
            </div>
        </div>
    );
}
