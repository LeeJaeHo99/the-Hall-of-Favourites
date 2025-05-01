"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";
import { transformChartData } from "@/util/setChartData";

const colors = ["#ffcc49", "#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];

interface RankChartPropsType {
    data: Array<{ name: string; data: number[] }>;
}

export default function RankChart({ data }: RankChartPropsType) {
    const chartData = transformChartData(data);

    return (
        <ResponsiveContainer width="100%" height={440}>
            <LineChart data={chartData}  margin={{ top: 20, right: 20, bottom: 20 }}>
                <XAxis dataKey="time" interval={0}/>
                <YAxis
                    tick={{ fill: "#555", fontSize: 14, fontWeight: 500 }}
                    tickLine={true}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Legend content={CustomLegend} />
                {data.map((member, i) => (
                    <Line
                        key={member.name}
                        type="monotone"
                        dataKey={member.name}
                        stroke={colors[i % colors.length]}
                        strokeWidth={2}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}