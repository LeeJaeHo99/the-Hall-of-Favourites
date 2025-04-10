import Image from "next/image";
import MusicPlayer from './MusicPlayer';

interface Winner {
    [key: string]: string;
}

export default function Winner({ group, singer }: Winner) {
    return (
        <div className="winner">
            <div className="winner-content">
            {/* <Image
                src={`/images/${group}/${singer}-main.png`}
                width={480}
                height={480}
                alt="오늘의 우승자"
            /> */}
            <MusicPlayer/>
            </div>
            <div className="winner-desc">
                <p>오늘의 우승자는 {group}의 {singer}입니다</p>
            </div>
        </div>
    );
}