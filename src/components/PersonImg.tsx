import Image from "next/image";

export default function PersonImg() {
    return (
        <div className="person-img--wrap">
            <Image
                className="person-img"
                src={`/images/aespa/karina.png`}
                width={480}
                height={480}
                alt="그룹, 멤버 사진"
            />
        </div>
    );
}