"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import PersonImg from "@/components/ui/PersonImg";
import LeftContent from "@/components/info/MemberLeftContent";
import RightContent from "@/components/info/MemberRightContent";
import Story from "@/components/info/Story";
import { MemberMainContentProps, MemberDataType } from "@/types/types";

export default function MemberPage() {
    const [trigger, setTrigger] = useState(false);
    const onClickTrigger = () => {
        setTrigger(true);
    };

    const params = useSearchParams();
    const q = params.get("q");

    const [memberData, setMemberData] = useState<MemberDataType>();

    useEffect(() => {
        const fetchMemberData = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`
            );
            const result = await res.json();
            const member = result.data;
            setMemberData(member.filter((mem) => mem.nameKo[0] === q)[0]);
        };
        fetchMemberData();
    }, []);

    return (
        <div className="MemberPage InfoPage sub-page">
            <Inner x={"column"} y={"between"}>
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
