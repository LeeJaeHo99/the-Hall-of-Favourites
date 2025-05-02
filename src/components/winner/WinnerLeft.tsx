import { WinnerLeftPropsType } from '@/types/types';
import { motion } from "motion/react";
import MusicThumbnail from "../ui/MusicThumnail";
import CheerMessage from '../ui/CheerMessage';

export default function WinnerLeft({ cheerMessage, song, group }: WinnerLeftPropsType) {
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
                <CheerMessage cheerMessage={cheerMessage}/>
            </motion.div>
        </div>
    );
}