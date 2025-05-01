'use client';

import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import LoadSpinner from "../spinner/LoadSpinner";
import useGetFullMember from "@/hooks/useGetFullMember";

export default function GroupLinkBtn() {
    const { memberData, isLoad, isError } = useGetFullMember();
    console.log('memberData: ', memberData);

    if(isLoad) return <div className="group-link--btn-load"><LoadSpinner/></div>;
    if(isError) return <ErrorMessage text={'아이돌 데이터를 불러오던중 에러가 발생하였습니다.'}/>;
    
    return (
        memberData?.map(member => (
        <Link
            key={member.nameEn}
            href={`/member?q=${member.nameKo[0]}`}
            className="group-link-btn blur-box"
        >
            {member.nameKo[0]}
        </Link>
        ))
    );
}