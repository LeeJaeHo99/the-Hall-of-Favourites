"use client";

import { useEffect, useRef } from "react";
import party from "party-js";
import { motion } from "motion/react";
import Image from "next/image";
import MusicPlayer from "./MusicPlayer";
import Link from "next/link";

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
                <LeftContent />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="main-content">
                        <p>🎉 오늘의 우승자 🎉</p>
                        <div>
                            <Image
                                className="winner-img"
                                ref={targetRef}
                                src={`/images/${group}/${singer}.png`}
                                // src={`/images/aespa/winter.png`}
                                width={480}
                                height={480}
                                alt="⭐️ 오늘의 우승자 ⭐️"
                            />
                        </div>
                        <div className="winner-desc">
                            <div className="winner-singer">
                                <Link href={'/'}>{singer}</Link>
                            </div>
                            <div className="winner-group">{group}</div>
                        </div>
                    </div>
                </motion.div>
                <RightContent />
            </div>
        </div>
    );
}

function LeftContent() {
    return (
        <div className="left-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <MusicPlayer />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="share-component blur-box">
                        <div className="title">공유하기</div>
                        <div className="logo-wrap">
                            <Image src={'/icons/kakao.png'} width={48} height={48} alt='카카오 아이콘'/>
                            <Image src={'/icons/x.png'} width={48} height={48} alt='x 아이콘'/>
                            <Image src={'/icons/instagram.png'} width={48} height={48} alt='인스타 아이콘'/>
                        </div>
                    </div>
                    </motion.div>
        </div>
    );
}

function RightContent() {
    return (
        <div className="right-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="title">역대 우승횟수</div>
                    <div className="result">
                        총 <span>27</span>회
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="title">역대 좋아요</div>
                    <div className="result">
                        총 <span>2840650</span>회
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="title">오늘의 좋아요</div>
                    <div className="result">
                        총 <span>4800</span>회
                    </div>
                </motion.div>
        </div>
    );
}
