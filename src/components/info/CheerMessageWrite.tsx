'use client';

import { useState } from 'react';
import usePostCheerMsg from '@/hooks/usePostCheerMsg';
import Image from 'next/image';
import LoadSpinner from '../spinner/LoadSpinner';
import ErrorMessage from '../ui/ErrorMessage';

export default function CheerMessageWrite() {
    const { postHandler, isPost, isPostError } = usePostCheerMsg();
    const [text, setText] = useState('');
    const writeMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const result = await postHandler({ text });
            console.log('result: ', result);

            if (result) {
                setText("");
            }else{
                throw new Error('네트워크 오류가 발생하였습니다.');
            }
        }
        catch (e) {
            console.error(e);
            return <ErrorMessage text={'댓글 작성 중 오류가 발생하였습니다.'}/>;
        }
        window.location.reload();
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
