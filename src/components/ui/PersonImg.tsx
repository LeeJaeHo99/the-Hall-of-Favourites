import Image from "next/image";
import { PersonalImgProps } from '../../types/types';

export default function PersonImg({group, nameEn}: PersonalImgProps) {
    return (
        <div className="person-img--wrap">
            <Image
                className="person-img"
                src={`/images/${group}/${nameEn}.png`}
                width={480}
                height={480}
                alt="그룹, 멤버 사진"
            />
        </div>
    );
}