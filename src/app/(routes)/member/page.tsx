"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MemberMainContentProps, MemberDataType } from "@/types/types";
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import PersonImg from "@/components/ui/PersonImg";
import LeftContent from "@/components/info/MemberLeftContent";
import RightContent from "@/components/info/MemberRightContent";
import Story from "@/components/info/Story";
import NoneInfo from "@/components/info/NoneInfo";
import useGetFullMember from "@/hooks/useGetFullMember";
import usePatchLikeMember from "@/hooks/usePatchLikeMember";

export default function MemberPage() {
    const [trigger, setTrigger] = useState(false);
    const onClickTrigger = () => {
        setTrigger(true);
    };

    const params = useSearchParams();
    const q = params.get("q");
    const { memberData, loading, error } = useGetFullMember();
    const { patchHandler, loadPathchLikeMem, errorPathchLikeMem } = usePatchLikeMember();
    const [filteredMember, setFilteredMember] = useState<MemberDataType | null>(null);

    useEffect(() => {
        if (Array.isArray(memberData) && q) {
            const found = memberData.find(mem => mem.nameKo[0] === q);
            setFilteredMember(found ?? null);
        }
    }, [memberData, q]);


    // 🤖 WORK : 좋아요 클릭시 오늘, 전체 좋아요 +1
    const handleLike = async () => {
        if (!memberData) return;
        const nameKo = filteredMember?.nameKo[0];
        patchHandler(nameKo);

        setFilteredMember(prev => ({
            ...prev,
            todayLike: [
                ...prev.todayLike.slice(0, -1),
                prev.todayLike[prev.todayLike.length - 1] + 1
            ],
            likeHistory: prev.likeHistory + 1
        }));
    };

    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>

    return (
        <div className="MemberPage InfoPage sub-page">
            <Inner x={"column"} y={"between"}>
                {
                    filteredMember === undefined
                        ? <NoneInfo/>
                        : (
                            <>
                            <div className="content-top">
                                <LeftContent
                                    victory={filteredMember?.victory}
                                    likeHistory={filteredMember?.likeHistory}
                                    todayLike={
                                        filteredMember?.todayLike[filteredMember?.todayLike?.length - 1]
                                    }
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
                                <RightContent memberData={filteredMember} />
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

function MainContent({ group, nameEn, title, desc, trigger }: MemberMainContentProps) {
    return (
        <div className="main-content--wrap">
            <PersonImg group={group} nameEn={nameEn} trigger={trigger}/>
            <Title title={title} desc={desc} />
        </div>
    );
}
