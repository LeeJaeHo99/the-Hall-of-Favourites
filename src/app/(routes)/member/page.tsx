"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useGetFullMember from "@/hooks/useGetFullMember";
import usePatchLikeMember from "@/hooks/usePatchLikeMember";
import { MemberDataType } from "@/types/types";
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import PersonImg from "@/components/ui/PersonImg";
import LeftContent from "@/components/info/MemberLeftContent";
import RightContent from "@/components/info/MemberRightContent";
import Story from "@/components/info/Story";
import NoneInfo from "@/components/info/NoneInfo";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadSpinner from "@/components/spinner/LoadSpinner";

interface MemberMainContentPropsType{
    group: string;
    trigger:  boolean;
    desc:  string;
    title:  string;
    nameEn:  string;
}

function MemberContent() {
    const [trigger, setTrigger] = useState(false);
    const onClickTrigger = () => {
        setTrigger(true);
    };

    const params = useSearchParams();
    const q = params.get("q");
    const { memberData, isLoad, isError } = useGetFullMember();
    const { patchHandler } = usePatchLikeMember();
    const [filteredMember, setFilteredMember] = useState<MemberDataType | null>(null);

    useEffect(() => {
        if (Array.isArray(memberData) && q) {
            const found = memberData.find(mem => mem.nameKo[0] === q);
            setFilteredMember(found ?? null);
        }
    }, [memberData, q]);

    // 🤖 WORK : 좋아요 클릭시 오늘, 전체 좋아요 +1
    const handleLike = async () => {
        if (!filteredMember) return;
        const nameKo = filteredMember.nameKo[0];
    
        try {
            await patchHandler(nameKo);
            // const result = await patchHandler(nameKo);
            // if(result === 'success'){
            //     setFilteredMember(prev => {
            //         if (!prev) return prev;
            //         const hour = new Date().getHours();
            //         const newTodayLike = [...prev.todayLike];
            //         newTodayLike[hour] = isSaturday ? (newTodayLike[hour] || 0) + 2 : (newTodayLike[hour] || 0) + 1;
            //         return {
            //             ...prev,
            //             todayLike: newTodayLike,
            //             likeHistory: isSaturday ? prev.likeHistory + 2 : prev.likeHistory + 1
            //         };
            //     });
            // }
        } catch (e: unknown) {
            if(e instanceof Error){
                alert('오늘은 이미 좋아요를 눌렀습니다.');
            }
        }
    };

    if (!filteredMember) return null;
    if(isLoad) return <div className="MemberPage InfoPage sub-page"></div>;
    if(isError) return <ErrorMessage text={'멤버 정보를 불러오는 중 에러가 발생하였습니다.'}/>;

    return (
        <div className="MemberPage InfoPage sub-page">
            <Inner x={"column"} y={"between"}>
                {
                    filteredMember === null
                        ? <NoneInfo/>
                        : (
                            <>
                            <div className="content-top">
                                <LeftContent
                                    victory={filteredMember?.victory}
                                    likeHistory={filteredMember?.likeHistory}
                                    song={filteredMember?.song}
                                    group={filteredMember?.group[2]}
                                    onClickTrigger={onClickTrigger}
                                    onHandleLike={handleLike}
                                />
                                <MainContent
                                    group={filteredMember?.group[0]}
                                    nameEn={filteredMember?.nameEn}
                                    title={`${filteredMember?.group[1]}`}
                                    desc={`${filteredMember?.nameKo[0]}`}
                                    trigger={trigger}
                                />
                                <RightContent memberData={filteredMember as MemberDataType} />
                            </div>
                            <Title
                                title={"여담"}
                                desc={"멤버의 간단한 여담을 알려드립니다."}
                            />
                            <Story story={filteredMember?.story} />
                            </>
                        )
                }
            </Inner>
        </div>
    );
}

function InfoLoadComponent(){
    return(
        <div className="MemberPage MemberPage-load InfoPage sub-page">
            <Inner>
                <LoadSpinner/>
            </Inner>
        </div>
    );
}

function MainContent({ group, nameEn, title, desc, trigger }: MemberMainContentPropsType) {
    return (
        <div className="main-content--wrap">
            <PersonImg group={group} nameEn={nameEn} trigger={trigger}/>
            <Title title={title} desc={desc} />
        </div>
    );
}

export default function MemberPage() {
    return (
        <Suspense fallback={<InfoLoadComponent />}>
            <MemberContent />
        </Suspense>
    );
}