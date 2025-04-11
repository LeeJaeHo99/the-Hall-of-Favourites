import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function useYoutubePlayer(songId: string) {
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadYouTubeIframeAPI = () => {
            if (window.YT) {
                createPlayer();
                return;
            }

            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };
        };

        const createPlayer = () => {
            playerRef.current = new window.YT.Player("youtube-player", {
                songId,
                events: {
                    onReady: () => {
                        setIsReady(true);
                    },
                },
            });
        };

        loadYouTubeIframeAPI();
    }, [songId]);

    return { playerRef, isReady };
}
