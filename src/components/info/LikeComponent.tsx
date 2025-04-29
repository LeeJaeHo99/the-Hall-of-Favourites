import Image from "next/image";

export default function LikeComponent({onClickTrigger, onHandleLike}) {

    return (
        <div className="blur-box" onClick={onClickTrigger}>
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