"use client";

import { useEffect, useRef, useState } from "react";
import { useIsSunday } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import party from "party-js";
import MusicThumbnail from "./MusicThumnail";
import ErrorMessage from "./ErrorMessage";

interface Winner {
    [key: string]: string;
}

export default function Winner({ group, singer }: Winner) {
    const isSunday = useIsSunday(state => state.isSunday);
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

    const [winnerData, setWinnerData] = useState<MemberDataType>();
    console.log(winnerData)

    useEffect(() => {
        const fetchMemberData = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`);

                if(!res.ok){
                    throw new Error('네트워크 오류가 발생하였습니다.');
                }

                const result = await res.json();
                const winner = result.data.sort((a, b) => {
                    let aMem = a?.weekLike[a?.weekLike.length - 1] ?? 0;
                    let bMem = b?.weekLike[b?.weekLike.length - 1] ?? 0;
    
                    return bMem - aMem;
                });
                setWinnerData(winner[0]);
            }
            catch(e){
                console.error(e);
                return <ErrorMessage text={'우승자를 불러오던중 에러가 발생하였습니다.'}/>
            }
        }
        fetchMemberData();
    }, []);

    return (
        <div className="winner">
            <div className="winner-content">
                <LeftContent song={winnerData?.song} group={winnerData?.group[2]}/>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="main-content">
                        {
                            isSunday
                                ? <p>🏅 이번주 우승자 🏅</p>
                                : <p>🎉 오늘의 우승자 🎉</p>
                        }
                        <div className={`person-img--wrap ${isSunday && 'sunday'}`}>
                            <Image
                                className="person-img"
                                ref={targetRef}
                                src={`/images/${group}/${singer}.png`}
                                width={480}
                                height={480}
                                alt="⭐️ 오늘의 우승자 ⭐️"
                            />
                        </div>
                        <div className="winner-desc">
                            <div className="winner-singer">
                                <Link href={`/member?q=${winnerData?.nameKo[0]}`}>{winnerData?.nameKo[0]}</Link>
                            </div>
                            <div className="winner-group">{winnerData?.group[1]}</div>
                        </div>
                    </div>
                </motion.div>
                <RightContent victory={winnerData?.victory} likeHistory={winnerData?.likeHistory} todayLike={winnerData?.todayLike[winnerData?.todayLike.length - 1]}/>
            </div>
        </div>
    );
}

function LeftContent({song, group}) {
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
                <MusicThumbnail song={song} group={group}/>
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
                        <Image
                            src={"/icons/kakao.png"}
                            width={48}
                            height={48}
                            alt="카카오 아이콘"
                        />
                        <Image
                            src={"/icons/x.png"}
                            width={48}
                            height={48}
                            alt="x 아이콘"
                        />
                        <Image
                            src={"/icons/instagram.png"}
                            width={48}
                            height={48}
                            alt="인스타 아이콘"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function RightContent({victory, likeHistory, todayLike}) {
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
                    총 <span>{victory}</span>회
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
                    총 <span>{likeHistory}</span>회
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
                    총 <span>{todayLike}</span>회
                </div>
            </motion.div>
        </div>
    );
}
