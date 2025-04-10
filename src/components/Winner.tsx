"use client";

import { motion } from "motion/react";
import Image from "next/image";
import MusicPlayer from "./MusicPlayer";

interface Winner {
    [key: string]: string;
}

export default function Winner({ group, singer }: Winner) {
    return (
        <div className="winner">
            <div className="winner-content">
                <Image
                className="winner-img"
                src={`/images/${group}/${singer}-main.png`}
                width={560}
                height={560}
                alt="오늘의 우승자"
            />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <MusicPlayer />
                </motion.div>
            </div>
            <div className="winner-desc">
                <p>
                    오늘의 우승자는 {group}의 {singer}입니다
                </p>
            </div>
        </div>
    );
}
