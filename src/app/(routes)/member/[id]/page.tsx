'use client';

import { useParams } from "next/navigation";

export default function MemberPage(){
    const params = useParams();

    return(
        <div>{params.id}</div>
    );
}