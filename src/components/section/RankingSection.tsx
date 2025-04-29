"use client";

import { useMemo } from "react";
import { getTop5, getTodayLikeSums } from "@/util/setChartData";
import useGetFullMember from "@/hooks/useGetFullMember";
import useChartTime from "@/hooks/useChartTime";

// 📀 COMPONENT
import Title from "@/components/ui/Title";
import RankChart from "../chart/RankChart";
import BlindContent from "../chart/BlindContent";
import CollectingContent from "../chart/CollectingContent";
import AnouningContent from "../chart/AnouningContent";
import RankingLoadComponent from "../spinner/RankingLoadComponent";
import ErrorMessage from "../ui/ErrorMessage";

export default function RankingSection() {
    const { memberData, isLoad, isError } = useGetFullMember();
    const {isBlindTime, isCollectingTime, isAnouncingTime} = useChartTime();

    const { top5, chartData } = useMemo(() => {
        if (!memberData) return { top5: [], chartData: [] };
        
        const top5 = getTop5(memberData);
        const chartData = top5.map(member => ({
            name: member.name,
            data: getTodayLikeSums(
                memberData.find(mem => mem.nameKo[0] === member.name)?.todayLike || []
            )
        }));

        return { top5, chartData };
    }, [memberData]);

    if(isLoad) return <RankingLoadComponent/>
    if(isError) return <ErrorMessage text={'차트 데이터를 불러오던중 에러가 발생하였습니다.'}/>

    return (
        <section className="page-section ranking-section">
            <Title
                title={"현재 TOP 5"}
                desc={"매 시간 정각에 순위가 업데이트 됩니다."}
            />
            {/* {isCollectingTime 
                ? <CollectingContent />
                : isBlindTime 
                    ? <BlindContent top5={top5} />
                    : isAnouncingTime
                        ? <AnouningContent/>
                        : <RankChart data={chartData} />
            } */}
            <RankChart data={chartData} />
        </section>
    );
}