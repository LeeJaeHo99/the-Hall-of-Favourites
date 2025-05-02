import Image from "next/image";
import { MusicThumbnailPropsType } from "@/types/types";

export default function MusicThumbnail({song, group}: MusicThumbnailPropsType) {
    const thumbnail = `https://img.youtube.com/vi/${song?.id}/maxresdefault.jpg`;

    return (
        <div className="player-wraper blur-box">
            <div className="music-player--wrap">
                {
                    song?.id
                        ? (
                            <Image
                                className={`music-thumbnail--img play`}
                                src={thumbnail}
                                width={480}
                                height={480}
                                alt="thumbnail"
                            />
                        )
                        : (
                            <div className="music-thumbnail--unload"></div>
                        )
                }
            </div>
            <div className="music-info">
                <div className="music-title">{song?.title}</div>
                <div className="music-singer">{group}</div>
            </div>
        </div>
    );
}