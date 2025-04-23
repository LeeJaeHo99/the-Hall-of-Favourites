import Image from "next/image";

export default function PersonImg({memberData}) {
    console.log('memberData: ', memberData);
    return (
        <div className="person-img--wrap">
            <Image
                className="person-img"
                src={`/images/${memberData?.group[0]}/${memberData?.nameEn}.png`}
                width={480}
                height={480}
                alt="그룹, 멤버 사진"
            />
        </div>
    );
}