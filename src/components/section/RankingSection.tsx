"use client";

import { useMemo, useState, useEffect } from "react";
import { checkIsBlindTime, checkIsCollectingTime, checkIsAnounceTime } from "@/util/setChartTime";
import { getTop5LatestLike, convertTop5Data } from "@/util/setChartData";
import Title from "@/components/ui/Title";
import RankChart from "../chart/RankChart";
import BlindContent from "../chart/BlindContent";
import CollectingContent from "../chart/CollectingContent";
import AnouningContent from "../chart/AnouningContent";
import useFullMemberData from "@/hooks/useFetchFullMember";

export default function RankingSection() {
    const { memberData, loading, error } = useFullMemberData();

    const top5 = useMemo(() => {
        if (!Array.isArray(memberData)) return [];
        return getTop5LatestLike(memberData);
    }, [memberData]);


    const chartData = useMemo(() => {
        return convertTop5Data(top5);
    }, [top5]);

    const [isBlindTime, setIsBlindTime] = useState(checkIsBlindTime());
    const [isCollectingTime, setIsCollectingTime] = useState(checkIsCollectingTime());
    const [isAnouncingTime, setIsAnouncingTime] = useState(checkIsAnounceTime());

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