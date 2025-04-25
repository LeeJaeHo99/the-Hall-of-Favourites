'use client';

import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import useGetGroup from "@/hooks/useGetGroup";

export default function GroupLinkBtn() {
    const { groupData, loadGroup, errorGroup } = useGetGroup();

    if(loadGroup) return <div>123</div>
    if(errorGroup) return <ErrorMessage text={'그룹 데이터를 불러오던중 에러가 발생하였습니다.'}/>
    
    return (
        groupData.map((group) => (
        <Link
            key={group.nameEn[0]}
            href={`/group?q=${group.nameEn[0]}`}
            className="group-link-btn blur-box"
        >
            {group.nameEn[1]}
        </Link>
        ))
    );
}
