import Image from "next/image";
import { BoardEditPropsType } from '@/types/types';


export default function BoardEdit({style, text, onClick}: BoardEditPropsType) {
    return (
        <div className={`board-edit--btn blur-box ${style}`} onClick={onClick}>
            <Image
                src={"/icons/write.png"}
                width={14}
                height={14}
                alt="글쓰기 아이콘"
            />
            <span>{text}</span>
        </div>
    );
}