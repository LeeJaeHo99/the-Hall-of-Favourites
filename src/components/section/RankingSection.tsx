"use client";

import { useMemo, useState, useEffect } from "react";
import { idol } from "@/data/data";
import Title from "@/components/Title";
import RankChart from "@/components/RankChart";

const colors: string[] = ["#ffcc49","#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];
const emoji: string[] = ["🥇", "🥈", "🥉", "💪", "💪"];

export default function RankingSection() {
    // TOP5 데이터 메모이제이션
    const top5 = useMemo(() => {
        if (!Array.isArray(idol)) return [];
        return getTop5IdolsByLatestLike(idol);
    }, [idol]);

    // TOP5 차트 데이터 메모이제이션
    const chartData = useMemo(() => {
        return convertTop5ToChartData(top5);
    }, [top5]);

    // AM 00:00 ~ PM 22:00 (차트출력) [ isBlindTime = F, isCollectingTime = F ]
    // PM 22:00 ~ PM 23:50 (오늘의 누적 데이터 출력) [ isBlindTime = T, isCollectingTime = F ]
    // PM 23:50 ~ AM 00:00 (데이터 집계) [ isBlindTime = F, isCollectingTime = T ]
    const [isBlindTime, setIsBlindTime] = useState(checkIsBlindTime());
    const [isCollectingTime, setIsCollectingTime] = useState(checkIsCollectingTime());
    const [isAnouncingTime, setIsAnouncingTime] = useState(checkIsAnounceTime());

    // 10초마다 새로고침
    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlindTime(checkIsBlindTime());
            setIsCollectingTime(checkIsCollectingTime());
            setIsAnouncingTime(checkIsAnounceTime());
        }, 1000 * 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="page-section ranking-section">
            <Title
                title={"현재 TOP 5"}
                desc={"매 시간 정각에 순위가 업데이트 됩니다."}
            />
            {isCollectingTime 
                ? <CollectingContent />
                : isBlindTime 
                    ? <BlindContent top5={top5} />
                    : isAnouncingTime
                        ? <AnouningContent/>
                        : <RankChart data={chartData} />
            }
        </section>
    );
}

function BlindContent({ top5 }) {
    return (
        <div className="blind-content blur-box">
            <p>🔒 현재는 블라인드 투표시간 입니다 🔒</p>
            <p>(아래는 PM 10:00 까지의 기록입니다)</p>
            <div className="blind-rank--wrap">
                {top5.map((idolItem, i) => (
                    <div key={idolItem.nameEn}>
                        <span className="name" style={{color: `${colors[i]}`}}>
                            {emoji[i]} {idolItem.nameKo[0]}
                        </span>
                        <span>{idolItem.likeHistory.at(-1)}표</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CollectingContent() {
    return (
        <div className="collecting-content blur-box">
            ⏳ 현재는 투표 집계 중입니다... ⏳
        </div>
    );
}

function AnouningContent(){
    return(
        <div className="collecting-content announing-content blur-box">
            ⏰ AM 01:00 ⏰
            <div>🔥 오늘의 첫 투표 결과가 발표 됩니다 🔥</div>
        </div>
    )
}

// 최근 5시간 TOP5 배열로 만들기
function getRecentHourlyTimes(count = 5) {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(now.getTime() - (count - 1 - i) * 60 * 60 * 1000);
        return `${d.getHours().toString().padStart(2, "0")}:00`;
    });
}

// TOP5 아이돌을 하나의 차트 데이터로 변환
function convertTop5ToChartData(idols) {
    const times = getRecentHourlyTimes(5);

    return times.map((time, i) => {
        const entry = { time };
        idols.forEach((idol) => {
            const historyLength = idol.likeHistory.length;
            const start = Math.max(0, historyLength - 5);
            const slicedHistory = idol.likeHistory.slice(start);
            const paddedHistory = Array(5 - slicedHistory.length)
                .fill(0)
                .concat(slicedHistory);

            entry[idol.nameKo[0]] = paddedHistory[i];
        });
        return entry;
    });
}

// 마지막 좋아요 수를 기준으로 TOP 5 아이돌 가져오기
function getTop5IdolsByLatestLike(idols) {
    return [...idols]
        .filter((idol) => idol.likeHistory.length > 0)
        .sort((a, b) => {
            const aLast = a.likeHistory[a.likeHistory.length - 1];
            const bLast = b.likeHistory[b.likeHistory.length - 1];
            return bLast - aLast;
        })
        .slice(0, 5);
}

// 차트 블라인드 (PM 22:00 ~ PM 23:50)
function checkIsBlindTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 22 || (h === 23 && m < 50);
}

// 순위 집계 (PM 23:50 ~ PM 23:59)
function checkIsCollectingTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 23 && m >= 50 && m <= 59;
}

// 첫 타임 순위 발표 (AM 00:00 ~ AM 00:59)
function checkIsAnounceTime(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    //test
    return h === 13 && m >= 12 && m <= 20;
}