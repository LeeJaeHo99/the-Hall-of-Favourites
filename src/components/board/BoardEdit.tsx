import Link from "next/link";
import Image from "next/image";

interface BoardEditProps{
    [key: string]: string;
}

export default function BoardEdit({style, text, link}: BoardEditProps) {
    return (
        <Link className={`board-edit--btn blur-box ${style}`} href={`/board/${link}`}>
            <Image
                src={"/icons/write.png"}
                width={14}
                height={14}
                alt="글쓰기 아이콘"
            />
            <span>{text}</span>
        </Link>
    );
}