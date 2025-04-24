import Image from "next/image";
import { LikeComponentProps } from '../../types/types';

export default function LikeComponent({onClickTrigger}: LikeComponentProps) {
    const handleLike = async () => {
        const nameKo = new URLSearchParams(window.location.search).get("q");

        if (!nameKo) {
            alert("멤버 이름이 없습니다.");
            return;
        }

        const res = await fetch(
            `/api/likeMember?q=${encodeURIComponent(nameKo)}`,
            { method: "PATCH" }
        );
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "오류가 발생했어요.");
        }
    };

    return (
        <div className="blur-box" onClick={onClickTrigger}>
            <div className="title">좋아요</div>
            <div className="content" onClick={handleLike}>
                <Image
                    className="heart-img"
                    src={"/icons/heart-purple.png"}
                    width={72}
                    height={72}
                    alt="하트 이미지"
                />
            </div>
        </div>
    );
}