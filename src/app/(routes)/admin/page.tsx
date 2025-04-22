'use client';

import { useState } from 'react';
import Inner from '@/components/Inner';
import AdminBtn from '@/components/admin/AdminBtn';
import AdminContent from '@/components/admin/AdminContent';

export default function AdminPage(){
    const [clickIdx, setClickIdx] = useState(0);
    const onClickIdx = (i: number) => {
        setClickIdx(i)
    }
    console.log('clickIdx: ', clickIdx);
    
    return(
        <div className="Adminpage sub-page">
            <Inner x='center' y='center'>
                <AdminBtn onClick={onClickIdx}/>
                <AdminContent clickIdx={clickIdx}/>
            </Inner>
        </div>
    );
}


// AdminBtn에서 i번째 버튼을 누르면 AdminContent에서 i번째 컨텐츠가 나오게