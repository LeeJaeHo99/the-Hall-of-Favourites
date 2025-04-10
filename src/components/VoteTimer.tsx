"use client";

import { useEffect, useState } from "react";

export default function VoteTimer() {
    const [statusInfo, setStatusInfo] = useState<{
        status: string;
        timeLeft: any;
    } | null>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const getTimeStatus = () => {
            const now = new Date();

            const voteEnd = new Date();
            voteEnd.setHours(23, 50, 0, 0);

            const voteEndLimit = new Date();
            voteEndLimit.setHours(23, 59, 59, 999);

            if (now >= voteEnd && now <= voteEndLimit) {
                return { status: "counting", timeLeft: null };
            }

            if (now > voteEndLimit) {
                voteEnd.setDate(voteEnd.getDate() + 1);
            }

            const diff = voteEnd.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            return {
                status: "voting",
                timeLeft: { hours, minutes, seconds },
            };
        };

        const update = () => {
            setStatusInfo(getTimeStatus());
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [mounted]);

    const format = (n: number) => n.toString().padStart(2, "0");

    if (!mounted || statusInfo === null) return null;

    return (
        <div className="vote-timer">
            {statusInfo.status === "counting" ? (
                "투표 집계 중입니다."
            ) : (
                <>
                    투표 종료까지 남은시간: {format(statusInfo.timeLeft.hours)}:
                    {format(statusInfo.timeLeft.minutes)}:
                    {format(statusInfo.timeLeft.seconds)}
                </>
            )}
        </div>
    );
}
