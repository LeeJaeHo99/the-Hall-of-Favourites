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
        if(Array.isArray(memberData)){
            const sortData = [...memberData]?.sort((a, b) => {
                const aRank = a.victory;
                const bRank = b.victory;
                return bRank - aRank;
            }).slice(0, 3);
            setMemberData(sortData);
        }
    }, []);

    if(isLoad) return <VictoryHistoryLoadComponent/>
    if(isError || !Array.isArray(memberData)) return <ErrorMessage text={'우승 데이터를 불러오던 중 에러가 발생하였습니다.'}/>;

    const [gold, silver, bronze] = memberData;

    return (
        <div className="victory-history blur-box">
            <div className="silver">
                <Profile
                    nameKo={silver?.nameKo[0]}
                    nameEn={silver?.nameEn}
                    group={silver?.group[0]}
                    history={silver?.victory}
                />
                <div className="box">🥈</div>
                <div className="box"></div>
            </div>
            <div className="gold">
                <Profile
                    nameKo={gold?.nameKo[0]}
                    nameEn={gold?.nameEn}
                    group={gold?.group[0]}
                    history={gold?.victory}
                />
                <div className="box">🥇</div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            <div className="bronze">
                <Profile
                    nameKo={bronze?.nameKo[0]}
                    nameEn={bronze?.nameEn}
                    group={bronze?.group[0]}
                    history={bronze?.victory}
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
            <div className="victory-num">{history}회 우승 🏆</div>
        </div>
    );
}