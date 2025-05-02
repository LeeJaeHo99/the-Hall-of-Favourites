'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CheerMessageWrite() {
    const [cheerMsg, setCheerMsg] = useState('');
    const writeMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheerMsg(e.target.value);
    }

    return (
        <div className="cheer-message--input blur-box">
            <div className="title">응원 메시지 입력</div>
            <form>
                <input value={cheerMsg} onChange={writeMsg} type="text" placeholder="20자 이내로 작성해주세요." maxLength={20}/>
                <button>
                    <Image src={'/icons/write.png'} width={12} height={12} alt='글쓰기 아이콘'/>
                </button>
            </form>
        </div>
    );
}
