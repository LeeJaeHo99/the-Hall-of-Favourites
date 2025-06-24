"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import JSConfetti from "js-confetti";

interface PersonImgPropsType{
    group: string;
    nameEn: string;
    trigger: boolean;
}

export default function PersonImg({
    group,
    nameEn,
    trigger,
}: PersonImgPropsType) {
    const imgRef = useRef<HTMLCanvasElement>(null);
    const jsConfettiRef = useRef<InstanceType<typeof JSConfetti> | null>(null);

    useEffect(() => {
        if (!jsConfettiRef.current && imgRef.current) {
            jsConfettiRef.current = new JSConfetti({
                canvas: imgRef.current,
            });
        }
    }, []);

    useEffect(() => {
        if (trigger === true && jsConfettiRef.current) {
            jsConfettiRef.current?.addConfetti({
                emojis: ['❤️', '💜', '💛', '💙', '💚'],
                emojiSize: 60,
                confettiNumber: 40,
            });
        }
    }, [trigger]);

    return (
        <div className="person-img--wrap">
            <canvas
                ref={imgRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                <Image
                    className="person-img"
                    src={`/images/${group}/${nameEn}.png`}
                    width={480}
                    height={480}
                    alt="그룹, 멤버 사진"
                />
            </div>
        </div>
    );
}
