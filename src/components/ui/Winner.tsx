"use client";

import { useState, useEffect, useRef } from "react";
import party from "party-js";
import ErrorMessage from "./ErrorMessage";
import useGetFullMember from "@/hooks/useGetFullMember";
import WinnerMain from "../winner/WinnerMain";
import WinnerLeft from "../winner/WinnerLeft";
import WinnerRight from "../winner/WinnerRight";
import WinnerLoadComponent from "../spinner/WinnerLoadComponent";


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
                let aMem = a?.weekLike[a?.weekLike.length - 1];
                let bMem = b?.weekLike[b?.weekLike.length - 1];
                return bMem - aMem;
            })[0];
            setMemberData(sorted);
        } else {
            const sorted = [...memberData]?.sort((a, b) => {
                let aMem = a?.weekLike.reduce((sum, cur) => sum + cur, 0);
                let bMem = b?.weekLike.reduce((sum, cur) => sum + cur, 0);
                return bMem - aMem;
            })[0];
            setMemberData(sorted);
        }
    }, [memberData]);

    if(Array.isArray(memberData) || isLoad) return <WinnerLoadComponent/> 
    if(isError) return <ErrorMessage text={'우승자 정보를 불러오던 중 에러가 발생하였습니다.'}/>

    return (
        <div className="winner">
            <div className="winner-content">
                <WinnerLeft
                    cheerMessage={memberData?.cheerMsg}
                    song={memberData?.song}
                    group={memberData?.group[2]}
                />
                <WinnerMain
                    targetRef={targetRef}
                    isSunday={isSunday}
                    groupL={memberData?.group[0]} 
                    groupU={memberData?.group[1]} 
                    nameKo={memberData?.nameKo[0]}
                    nameEn={memberData?.nameEn}
                />
                <WinnerRight
                    victory={memberData?.victory}
                    likeHistory={memberData?.likeHistory}
                    todayLike={memberData?.todayLike?.reduce((a, b) => a + b, 0)}
                />
            </div>
        </div>
    );
}