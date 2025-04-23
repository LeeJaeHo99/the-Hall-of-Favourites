import MusicThumbnail from "@/components/MusicThumnail";
import Image from "next/image";

export default function LeftContent({ victory, likeHistory, todayLike, song, group }) {
    return (
        <div className="left-content--wrap">
            <MusicThumbnail song={song} group={group}/>
            <div className="content-box">
                <div className="blur-box">
                    <div className="title">우승 횟수</div>
                    <div className="content">
                        <span>{victory}</span> <sub>회</sub>
                    </div>
                </div>
                <div className="blur-box">
                    <div className="title">역대 좋아요</div>
                    <div className="content">
                        <span>{likeHistory}</span> <sub>회</sub>
                    </div>
                </div>
            </div>
            <div className="content-box">
                <div className="blur-box">
                    <div className="title">오늘의 좋아요</div>
                    <div className="content">
                        <span>{todayLike}</span> <sub>회</sub>
                    </div>
                </div>
                <LikeComponent />
            </div>
        </div>
    );
}

function LikeComponent() {
    const handleLike = async () => {
        const nameKo = new URLSearchParams(window.location.search).get("q");

        if (!nameKo) {
            alert("멤버 이름이 없습니다.");
            return;
        }

        const res = await fetch(
            `/api/likeMember?q=${encodeURIComponent(nameKo)}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        if (res.ok) {
            alert("좋아요 성공!");
        } else {
            alert(data.message || "오류가 발생했어요.");
        }
    };

    return (
        <div className="blur-box">
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