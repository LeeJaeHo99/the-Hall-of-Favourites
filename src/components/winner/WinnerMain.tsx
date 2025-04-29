import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { WinnerMainPropsType } from '../../types/types';

export default function WinnerMain({ targetRef, isSunday, groupL, groupU, nameKo, nameEn }: WinnerMainPropsType) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <div className="main-content">
                {isSunday ? (
                    <p>👑 이번주 우승자 👑</p>
                ) : (
                    <p>🎉 오늘의 우승자 🎉</p>
                )}
                <div className={`person-img--wrap ${isSunday && "sunday"}`}>
                    <Image
                        className="person-img"
                        ref={targetRef}
                        src={`/images/${groupL}/${nameEn}.png`}
                        width={480}
                        height={480}
                        alt="⭐️ 오늘의 우승자 ⭐️"
                    />
                </div>
                <div className="winner-desc">
                    <div className="winner-singer">
                        <Link href={`/member?q=${nameKo}`}>
                            {nameKo}
                        </Link>
                    </div>
                    <div className="winner-group">{groupU}</div>
                </div>
            </div>
        </motion.div>
    );
}
