"use client";

import { useYoutubePlayer } from "@/hooks/useYoutubePlayer";
import MusicThumbnail from "./MusicThumnail";
import { useState, useEffect } from "react";

export default function MusicPlayer() {
    const videoId = "vQkdt5txAcM";
    const { playerRef, isReady } = useYoutubePlayer(videoId);
    const [isPlaying, setIsPlaying] = useState(false);
    

    const clickPlayer = () => {
        if (!isReady || !playerRef.current) {
            console.warn("Player is not ready!");
            return;
        }

        const playerState = playerRef.current.getPlayerState();
        if (playerState === window.YT.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
    };

    return (
        <div className="music-player--wrap">
            <div id="youtube-player" style={{ display: "none" }} />
            <button
                className={`play-btn ${isPlaying ? "play" : "pause"}`}
                onClick={clickPlayer}
            ></button>
            <MusicThumbnail videoId={videoId} isPlaying={isPlaying} />
            <div className="music-info">
                <div className="music-title">Supernova</div>
                <div className="music-singer">에스파</div>
            </div>
        </div>
    );
}
