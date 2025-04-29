import Image from "next/image";
import { WinnerLeftPropsType } from '@/types/types';
import { motion } from "motion/react";
import MusicThumbnail from "../ui/MusicThumnail";

export default function WinnerLeft({ song, group }: WinnerLeftPropsType) {
    return (
        <div className="left-content">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <MusicThumbnail song={song} group={group} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <div className="share-component blur-box">
                    <div className="title">공유하기</div>
                    <div className="logo-wrap">
                        <Image
                            src={"/icons/kakao.png"}
                            width={48}
                            height={48}
                            alt="카카오 아이콘"
                        />
                        <Image
                            src={"/icons/x.png"}
                            width={48}
                            height={48}
                            alt="x 아이콘"
                        />
                        <Image
                            src={"/icons/instagram.png"}
                            width={48}
                            height={48}
                            alt="인스타 아이콘"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}