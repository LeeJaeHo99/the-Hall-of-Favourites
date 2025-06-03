"use client";

import { useState, useEffect, useRef } from "react";
import party from "party-js";
import ErrorMessage from "./ErrorMessage";
import useGetFullMember from "@/hooks/useGetFullMember";
import WinnerMain from "../winner/WinnerMain";
import WinnerLeft from "../winner/WinnerLeft";
import WinnerRight from "../winner/WinnerRight";
import WinnerLoadComponent from "../spinner/WinnerLoadComponent";
import { MemberDataType } from "@/types/types";

export default function Winner() {
    const [isSunday, setIsSunday] = useState(false);
    useEffect(() => {
        setIsSunday(new Date().getDay() === 0);
    }, []);
    
    const targetRef = useRef(null);
    const { memberData, isLoad, isError, setMemberData } = useGetFullMember();

    useEffect(() => {
        if (targetRef.current) {
            party.confetti(targetRef.current, {
                count: 80,
                size: 1.5,
                spread: 70,
            });
        }
    }, [memberData]);


    useEffect(() => {
        if (!Array.isArray(memberData)) return;
        
        if (!isSunday) {
            const sorted = [...memberData]?.sort((a, b) => {
                const aMem = a?.todayLike.reduce((sum, cur) => sum + cur, 0);
                const bMem = b?.todayLike.reduce((sum, cur) => sum + cur, 0);
                return bMem - aMem;
            })[0];
            setMemberData(sorted);
        } else {
            const sorted = [...memberData]?.sort((a, b) => {
                const aMem = a?.weekLike.reduce((sum, cur) => sum + cur, 0);
                const bMem = b?.weekLike.reduce((sum, cur) => sum + cur, 0);
                return bMem - aMem;
            })[0];
            setMemberData(sorted);
        }
    }, [memberData, isSunday, setMemberData]);

    if(Array.isArray(memberData) || isLoad) return <WinnerLoadComponent/> 
    if(isError) return <ErrorMessage text={'우승자 정보를 불러오던 중 에러가 발생하였습니다.'}/>

    return (
        <div className="winner">
            <div className="winner-content">
                <WinnerLeft
                    cheerMessage={(memberData as MemberDataType)?.cheerMsg?.reverse()}
                    song={(memberData as MemberDataType)?.song}
                    group={(memberData as MemberDataType)?.group[2]}
                />
                <WinnerMain
                    targetRef={targetRef}
                    isSunday={isSunday}
                    groupL={(memberData as MemberDataType)?.group[0]} 
                    groupU={(memberData as MemberDataType)?.group[1]} 
                    nameKo={(memberData as MemberDataType)?.nameKo[0]}
                    nameEn={(memberData as MemberDataType)?.nameEn}
                />
                <WinnerRight
                    victory={(memberData as MemberDataType)?.victory}
                    likeHistory={(memberData as MemberDataType)?.likeHistory}
                    todayLike={(memberData as MemberDataType)?.todayLike?.reduce((a, b) => a + b, 0)}
                />
            </div>
        </div>
    );
}