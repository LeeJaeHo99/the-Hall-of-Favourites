'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProfileHistoryPropsType } from "@/types/types";
import useGetFullMember from "@/hooks/useGetFullMember";
import VictoryHistoryLoadComponent from "../spinner/VictoryHistoryLoadComponent";
import ErrorMessage from "./ErrorMessage";

export default function VictoryHistory() {
    const { memberData, isLoad, isError, setMemberData } = useGetFullMember();

    useEffect(() => {
        setMemberData(memberData?.sort((a, b) => {
            const aRank = a.victory;
            const bRank = b.victory;
            return bRank - aRank;
        }).slice(0, 3));
    }, []);

    if(isLoad) return <VictoryHistoryLoadComponent/>
    if(isError) return <ErrorMessage text={'우승 데이터를 불러오던 중 에러가 발생하였습니다.'}/>;

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

function Profile({ nameKo, nameEn, group, history }: ProfileHistoryPropsType) {
    const router = useRouter();
    const linkWinners = () => {
        router.push(`/member?q=${nameKo}`);
    }
    return (
        <div className="profile" onClick={linkWinners}>
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