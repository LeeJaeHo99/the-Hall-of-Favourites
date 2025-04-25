"use client";

import { useEffect, useRef, useState } from "react";
import { useIsSunday } from "@/store/store";
import party from "party-js";
import ErrorMessage from "./ErrorMessage";
import useGetFullMember from "@/hooks/useGetFullMember";
import WinnerMain from "../winner/WinnerMain";
import WinnerLeft from "../winner/WinnerLeft";
import WinnerRight from "../winner/WinnerRight";


export default function Winner() {
    const isSunday = useIsSunday((state) => state.isSunday);
    const targetRef = useRef(null);

    const { memberData, loadFullMem, errorFullMem, setMemberData } = useGetFullMember();

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
                let aMem = a?.todayLike.reduce((sum, cur) => sum + cur, 0);
                let bMem = b?.todayLike.reduce((sum, cur) => sum + cur, 0);
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

    if(Array.isArray(memberData) || loadFullMem){
        return(
            <div>12345</div>
        ) 
    } 

    return (
        <div className="winner">
            <div className="winner-content">
                <WinnerLeft
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
                    todayLike={
                        memberData?.todayLike[memberData?.todayLike.length - 1]
                    }
                />
            </div>
        </div>
    );
}