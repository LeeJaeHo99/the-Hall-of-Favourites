"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CheerMessagePropsType {
    cheerMessage: string[];
    nameKo: string;
}

export default function CheerMessage({ cheerMessage, nameKo }: CheerMessagePropsType) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const router = useRouter();

    const goWinnerPage = () => {
        router.push(`member?q=${nameKo}`)
    }

    useEffect(() => {
        if (!cheerMessage || cheerMessage.length === 0) return;

        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % cheerMessage.length);
                setVisible(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [cheerMessage]);

    if (!cheerMessage || cheerMessage.length === 0) {
        return (
            <div className="cheer-message--wrap blur-box" onClick={goWinnerPage} style={{cursor: 'pointer'}}>
                <div className="title">응원 메시지</div>
                <div
                    className={`cheer-message ${
                        visible ? "fadeIn" : "fadeOut"
                    }`}
                >
                    응원 메시지를 입력해주세요
                </div>
            </div>
        );
    }

    return (
        <div className="cheer-message--wrap blur-box">
            <div className="title">응원 메시지</div>
            <div className={`cheer-message ${visible ? "fadeIn" : "fadeOut"}`}>
                {cheerMessage[currentIndex]}
            </div>
        </div>
    );
}
