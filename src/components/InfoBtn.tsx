import Image from "next/image";
import Link from "next/link";

interface GroupName {
    [key: string]: string;
}

export default function InfoBtn({ groupEn, groupKo }: GroupName) {
    return (
        <Link href={`/group/${groupEn}`} className="info-btn">
            <Image
                className="group-img"
                src={`/images/${groupEn}/${groupEn}.png`}
                width={320}
                height={280}
                alt="그룹 사진"
            />
            <p className="group-name">{groupKo}</p>
        </Link>
    );
}