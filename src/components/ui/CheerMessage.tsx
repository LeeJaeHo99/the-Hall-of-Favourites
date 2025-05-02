"use client";

import { useEffect, useState } from "react";

interface CheerMessagePropsType {
    cheerMessage: string[];
}

export default function CheerMessage({ cheerMessage }: CheerMessagePropsType) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

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

    return (
        <div className="cheer-message--wrap blur-box">
            <div className="title">응원 메시지</div>
            <div
                className={`cheer-message ${visible ? 'fadeIn' : 'fadeOut'}`}
            >
                {cheerMessage[currentIndex]}
            </div>
        </div>
    );
}
