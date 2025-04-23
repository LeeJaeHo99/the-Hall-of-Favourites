import Image from "next/image";

export default function MusicThumbnail({song, group}) {
    const thumbnail = `https://img.youtube.com/vi/${song?.id}/maxresdefault.jpg`;

    return (
        <div className="player-wraper blur-box">
            <div className="music-player--wrap">
                <Image
                    className={`music-thumbnail--img play`}
                    src={thumbnail}
                    width={480}
                    height={480}
                    alt="thumbnail"
                />
            </div>
            <div className="music-info">
                <div className="music-title">{song?.title}</div>
                <div className="music-singer">{group}</div>
            </div>
        </div>
    );
}