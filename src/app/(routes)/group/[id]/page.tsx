'use client';

import { useParams } from "next/navigation";
import Inner from '@/components/Inner';

export default function GroupPage(){
    const params = useParams();

    return(
        <div className="GroupPage">
            <Inner x={'left'}>
                {params.id}
            </Inner>
        </div>
    );
}