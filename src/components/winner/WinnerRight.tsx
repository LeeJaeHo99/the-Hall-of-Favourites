import { motion } from "motion/react";

export default function WinnerRight({ victory, likeHistory, todayLike }) {
    return (
        <div className="right-content">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <div className="title">역대 우승횟수</div>
                <div className="result">
                    총 <span>{victory}</span>회
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <div className="title">역대 좋아요</div>
                <div className="result">
                    총 <span>{likeHistory}</span>회
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                <div className="title">오늘의 좋아요</div>
                <div className="result">
                    총 <span>{todayLike}</span>회
                </div>
            </motion.div>
        </div>
    );
}