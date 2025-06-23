import Image from "next/image";

interface LikeComponentProps {
    onClickTrigger: () => void;
    onHandleLike: () => void;
}

export default function LikeComponent({onClickTrigger, onHandleLike}: LikeComponentProps) {

    return (
        <div className="blur-box like-btn" onClick={onClickTrigger}>
            <div className="title">좋아요</div>
            <div className="content" onClick={onHandleLike}>
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