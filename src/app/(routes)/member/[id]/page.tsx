"use client";

// import { useParams } from "next/navigation";
import Inner from "@/components/Inner";
import Title from "@/components/Title";
import PersonImg from "@/components/PersonImg";
import MusicThumbnail from "@/components/MusicThumnail";
import Image from "next/image";

export default function MemberPage() {
    // const params = useParams();

    return (
        <div className="MemberPage PersonPage sub-page">
            <Inner x={"row"} y={"between"}>
                <LeftContent />
                <MainContent />
                <RightContent />
            </Inner>
        </div>
    );
}

function LeftContent() {
    return (
        <div className="left-content--wrap">
            <MusicThumbnail />
            <div className="content-box">
                <div className="blur-box">
                    <div className="title">우승 횟수</div>
                    <div className="content">
                        <span>47</span> <sub>회</sub>
                    </div>
                </div>
                <div className="blur-box">
                    <div className="title">역대 좋아요</div>
                    <div className="content">
                        <span>125922</span> <sub>회</sub>
                    </div>
                </div>
            </div>
            <div className="content-box">
                <div className="blur-box">
                    <div className="title">오늘의 좋아요</div>
                    <div className="content">
                        <span>487</span> <sub>회</sub>
                    </div>
                </div>
                <div className="blur-box">
                    <div className="title">좋아요</div>
                    <div className="content">
                        <Image
                            className="heart-img"
                            src={"/icons/heart.png"}
                            width={72}
                            height={72}
                            alt="하트 이미지"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MainContent() {
    return (
        <div className="main-content--wrap">
            <PersonImg />
            <Title title={"AESPA"} desc={"카리나"} />
        </div>
    );
}

function RightContent() {
    const title = ['이름: ', '그룹: ', '소속: ', '데뷔일: ', '생일: ', '나이: '];
    const data = ['카리나', '에스파', 'SM', '20-11-17', '00-04-11', 26]
    return (
        <div className="right-content--wrap blur-box">
            <h2>프로필</h2>
            {
                title.map((titleData, i) => (
                    <div key={i}>
                        <div className="title">{titleData}</div>
                        <div className="info">{data[i]}</div>
                    </div>

                ))
            }
        </div>
    );
}