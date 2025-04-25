'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProfileProps } from "@/types/types";
import useGetFullMember from "@/hooks/useGetFullMember";

export default function VictoryHistory() {
    const { memberData, loadFullMem, errorFullMem, setMemberData } = useGetFullMember();

    useEffect(() => {
        setMemberData(memberData?.sort((a, b) => {
            let aRank = a.victory;
            let bRank = b.victory;
            return bRank - aRank;
        }).slice(0, 3));
    }, []);

    if(loadFullMem) return <div>123</div>;

    return (
        <div className="victory-history blur-box">
            <div className="silver">
                <Profile
                    nameKo={memberData[1]?.nameKo[0]}
                    nameEn={memberData[1]?.nameEn}
                    group={memberData[1]?.group[0]}
                    history={memberData[1]?.victory}
                />
                <div className="box">🥈</div>
                <div className="box"></div>
            </div>
            <div className="gold">
                <Profile
                    nameKo={memberData[0]?.nameKo[0]}
                    nameEn={memberData[0]?.nameEn}
                    group={memberData[0]?.group[0]}
                    history={memberData[0]?.victory}
                />
                <div className="box">🥇</div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            <div className="bronze">
                <Profile
                    nameKo={memberData[2]?.nameKo[0]}
                    nameEn={memberData[2]?.nameEn}
                    group={memberData[2]?.group[0]}
                    history={memberData[2]?.victory}
                />
                <div className="box">🥉</div>
            </div>
        </div>
    );
}

function Profile({ nameKo, nameEn, group, history }: ProfileProps) {
    return (
        <div className="profile">
            <Image
                src={`/images/${group}/${nameEn}.png`}
                width={60}
                height={60}
                alt="프로필 이미지"
            />
            <span>{nameKo}</span>
            <div className="victory-num">역대 {history}회 우승 🏆</div>
        </div>
    );
}