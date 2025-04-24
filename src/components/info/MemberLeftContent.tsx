import MusicThumbnail from "@/components/ui/MusicThumnail";
import { MemberLeftContentProps } from "@/types/types";
import LikeComponent from "./LikeComponent";

export default function LeftContent({
    victory,
    likeHistory,
    todayLike,
    song,
    group,
    onClickTrigger,
}: MemberLeftContentProps) {
    return (
        <div className="left-content--wrap">
            <MusicThumbnail song={song} group={group} />
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
                <LikeComponent onClickTrigger={onClickTrigger}/>
            </div>
        </div>
    );
}