import Link from "next/link";
import Image from "next/image";

export default function BoardEdit({text, link}) {
    return (
        <Link className="board-edit--btn blur-box" href={`/board/${link}`}>
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