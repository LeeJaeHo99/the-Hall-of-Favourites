"use client";

import { useEffect, useRef } from "react";
import party from "party-js";
import { motion } from "motion/react";
import Image from "next/image";
import MusicPlayer from "./MusicPlayer";

interface Winner {
    [key: string]: string;
}

export default function Winner({ group, singer }: Winner) {
    const targetRef = useRef(null);

    useEffect(() => {
        if (targetRef.current) {
            party.confetti(targetRef.current, {
                count: 80,
                size: 1.5,
                spread: 70,
            });
        }
    }, []);

    return (
        <div className="winner">
            <div className="winner-content">
                <p>오늘의 우승자</p>
                <div>
                    <Image
                        className="winner-img"
                        ref={targetRef}
                        src={`/images/${group}/${singer}-main.png`}
                        width={560}
                        height={560}
                        alt="오늘의 우승자"
                    />
                    <div className="winner-desc">
                        <div className="winner-singer">{singer}</div>
                        <div className="winner-group">{group}</div>
                    </div>
                </div>
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <MusicPlayer />
                </motion.div> */}
            </div>
        </div>
    );
}
