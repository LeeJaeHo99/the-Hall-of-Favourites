'use client';

import { useParams } from "next/navigation";

export default function GroupPage(){
    const params = useParams();

    return(
        <div>{params.id}</div>
    );
}