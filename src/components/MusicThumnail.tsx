import Image from "next/image";

export default function MusicThumbnail() {
    const songId = "vQkdt5txAcM";
    const thumbnail = `https://img.youtube.com/vi/${songId}/maxresdefault.jpg`;

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
                <div className="music-title">Supernova</div>
                <div className="music-singer">에스파</div>
            </div>
        </div>
    );
}