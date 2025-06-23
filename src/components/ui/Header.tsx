"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Inner from "@/components/ui/Inner";
import VoteTimer from "@/components/ui/VoteTimer";

export default function Header() {
    const [isClicked, setIsClicked] = useState(false);
    const onClick = () => {
        setIsClicked((prev) => !prev);
    };
    
    const [isSaturday, setIsSaturday] = useState(false);
    useEffect(() => {
        setIsSaturday(new Date().getDay() === 6);
    }, []);

    return (
        <header>
            <Inner x="between">
                <div className={`burning ${isSaturday ? 'yes' : 'no'}`}>🔥 버닝 데이 🔥</div>
                <h1>
                    <Link href={"/"} className="title">최애의 전당</Link>
                    <div className="site-desc" onClick={onClick}>
                        ?
                    </div>
                </h1>
                <div className="vote-timer--wrap">
                    <VoteTimer />
                </div>
                {isClicked && <DescSite onClick={onClick}/>}
            </Inner>
        </header>
    );
}

interface DescSitePropsType{
    onClick: () => void;
}

function DescSite({onClick}: DescSitePropsType) {
    return (
        <div className="desc-site--component">
            <div className="delete-btn" onClick={onClick}>X</div>
            <div className="section">
                <h3>사이트 소개 📝</h3>
                <div>당신의 최애 아이돌에게 매일 한 번, 좋아요를 눌러 응원할 수 있습니다.</div>
                <div>
                    가장 많은 좋아요를 받은 아이돌은 다음날 사이트 메인에 <br />
                    사진과 대표곡 등이 함께 공개됩니다.
                </div>
                <div>
                    매주 <strong>토요일</strong>은 특별한 <strong>2배 이벤트</strong>가 진행되며,<br />
                    한 번의 클릭으로 두배의 좋아요가 반영됩니다.
                </div>
                <div>
                    또한 <strong>일요일</strong>에는 월요일부터 토요일까지의<br /> 
                    좋아요 총합 1위가 <strong>그 주의 최종 우승</strong>을 차지합니다.
                </div>
            </div>

            <div className="section">
                <h3>투표 집계 방식 🗳️</h3>
                <div>매일 <strong>AM 00:00 ~ PM 11:50</strong>까지 투표 가능합니다.</div>
                <div>PM 11:50 ~ PM 11:59까지는 <strong>집계 시간</strong>이므로 투표가 제한됩니다.</div>
                <div>AM 00:00에 전날의 우승자가 <strong>메인에 공개</strong>됩니다.</div>
                <div>※ 서버 상황에 따라 약간의 오차가 발생할 수 있습니다.</div>
            </div>

            <div className="section">
                <h3>기타 안내 💡</h3>
                <div>하루에 한 명의 멤버에게는 <strong>한 번만 투표가 가능</strong>합니다.</div>
                <div>아이돌 상세 페이지에서 멤버 정보와 현재 까지의 데이터등을 확인할 수 있습니다.</div>
                <div>긍정적인 팬 문화 조성을 위한 건전한 사용을 부탁드립니다 😊</div>
                <div>문의사항이 있으시면 ljh2735294@naver.com 으로 문의주세요.</div>
            </div>
        </div>
    );
}
