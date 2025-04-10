import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function useYoutubePlayer(videoId: string) {
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false); // ✅ 유튜브 플레이어 로드 완료 여부

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
                videoId,
                events: {
                    onReady: () => {
                        setIsReady(true); // ✅ 로드 완료 표시
                    },
                },
            });
        };

        loadYouTubeIframeAPI();
    }, [videoId]);

    return { playerRef, isReady };
}
