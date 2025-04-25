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

export default function MemberPage() {
    const [trigger, setTrigger] = useState(false);
    const onClickTrigger = () => {
        setTrigger(true);
    };

    const params = useSearchParams();
    const q = params.get("q");
    const { memberData, loading, error } = useGetFullMember();

    useEffect(() => {
            setMemberData(member.filter((mem) => mem.nameKo[0] === q)[0]);
    }, []);

    // 🤖 WORK : 좋아요 클릭시 오늘, 전체 좋아요 +1
    const handleLike = async () => {
        if (!memberData) return;
        const nameKo = memberData.nameKo[0];
        const res = await fetch(`/api/likeMember?q=${encodeURIComponent(nameKo)}`, { method: "PATCH" });
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "오류가 발생했어요.");
            return;
        }

        setMemberData(prev => ({
            ...prev,
            todayLike: [
                ...prev.todayLike.slice(0, -1),
                prev.todayLike[prev.todayLike.length - 1] + 1
            ],
            likeHistory: prev.likeHistory + 1
        }));
    };

    return (
        <div className="MemberPage InfoPage sub-page">
            <Inner x={"column"} y={"between"}>
                {
                    memberData === undefined
                        ? <NoneInfo/>
                        : (
                            <>
                            <div className="content-top">
                                <LeftContent
                                    victory={memberData?.victory}
                                    likeHistory={memberData?.likeHistory}
                                    todayLike={
                                        memberData?.todayLike[
                                            memberData?.todayLike.length - 1
                                        ]
                                    }
                                    song={memberData?.song}
                                    group={memberData?.group[2]}
                                    onClickTrigger={onClickTrigger}
                                    onHandleLike={handleLike}
                                />
                                <MainContent
                                    group={memberData?.group[0]}
                                    nameEn={memberData?.nameEn}
                                    title={`${memberData?.group[1]}`}
                                    desc={`${memberData?.nameKo[0]}`}
                                    trigger={trigger}
                                />
                                <RightContent memberData={memberData} />
                            </div>
                            <Title
                                title={"여담"}
                                desc={"멤버의 간단한 여담을 알려드립니다."}
                            />
                            <Story story={memberData?.story} />
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
