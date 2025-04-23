"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Inner from "@/components/Inner";
import Title from "@/components/Title";
import PersonImg from "@/components/PersonImg";
import MusicThumbnail from "@/components/MusicThumnail";
import Image from "next/image";

export default function MemberPage() {
    const params = useSearchParams();
    const q = params.get('q');

    const [memberData, setMemberData] = useState();

    useEffect(() => {
        const fetchMemberData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`);
            const result = await res.json();
            const member = result.data;
            setMemberData(member.filter(mem => mem.nameKo[0] === q)[0]);
        }
        fetchMemberData();
    }, []);
    console.log(memberData);

    return (
        <div className="MemberPage InfoPage sub-page">
            <Inner x={"row"} y={"between"}>
                <LeftContent victory={memberData?.victory} likeHistory={memberData?.likeHistory} todayLike={memberData?.todayLike[memberData?.todayLike.length - 1]}/>
                <MainContent />
                <RightContent />
            </Inner>
        </div>
    );
}

function LeftContent({victory, likeHistory, todayLike}) {
    return (
        <div className="left-content--wrap">
            <MusicThumbnail />
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
                <LikeComponent/>
            </div>
        </div>
    );
}

function LikeComponent(){
    const handleLike = async () => {
        const nameKo = new URLSearchParams(window.location.search).get("q"); // '카리나' 같은 값
      
        if (!nameKo) {
          alert("멤버 이름이 없습니다.");
          return;
        }
      
        const res = await fetch(`/api/likeMember?nameKo=${encodeURIComponent(nameKo)}`, {
          method: "PATCH",
        });
      
        const data = await res.json();
      
        if (res.ok) {
          alert("좋아요 성공!");
        } else {
          alert(data.message || "오류가 발생했어요.");
        }
      };

    return(
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
    const data = ['카리나', '에스파', 'SM', '20-11-17', '00-04-11', 26];
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