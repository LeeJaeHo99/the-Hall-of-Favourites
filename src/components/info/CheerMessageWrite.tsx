'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePostCheerMsg from '@/hooks/usePostCheerMsg';
import Image from 'next/image';
import LoadSpinner from '../spinner/LoadSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface CheerMessageWriteProps {
    memberName: string;
}

export default function CheerMessageWrite({ memberName }: CheerMessageWriteProps) {
    const { postHandler, isPost, isPostError } = usePostCheerMsg();
    const [text, setText] = useState('');
    const router = useRouter();

    const writeMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await postHandler({ text, query: memberName });

            if (result?.data?.matchedCount === 1) {
                setText("");
                router.push('/');
            } else {
                throw new Error(result?.message || '응원 메시지 저장에 실패했습니다.');
            }
        }
        catch (e) {
            console.error('응원 메시지 저장 중 오류:', e);
            return <ErrorMessage text={e instanceof Error ? e.message : '응원 메시지 저장 중 오류가 발생하였습니다.'}/>;
        }
    }

    if(isPost) return <LoadSpinner/>;
    if(isPostError) return <ErrorMessage text='응원메시지를 보내던 중 에러가 발생하였습니다.'/>;

    return (
        <div className="cheer-message--input blur-box">
            <div className="title">응원 메시지 입력</div>
            <form onSubmit={handleSubmit}>
                <input value={text} onChange={writeMsg} type="text" placeholder="20자 이내로 작성해주세요." maxLength={20}/>
                <button>
                    <Image src={'/icons/write.png'} width={12} height={12} alt='글쓰기 아이콘'/>
                </button>
            </form>
        </div>
    );
}
