import Image from "next/image";

export default function MusicThumbnail({ videoId, isPlaying }) {
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
            <Image
                className={`music-thumbnail--img ${
                    isPlaying ? `play` : `pause`
                }`}
                src={thumbnail}
                width={480}
                height={480}
                alt="thumbnail"
            />
    );
}
