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

const colors = ["#ffcc49", "#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];

export default function RankChart({ data }) {
    const idolNames = Object.keys(data?.[0] || {}).filter(
        (key) => key !== "time"
    );

    return (
        <ResponsiveContainer width="90%" height={440}>
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis
                    tick={{ fill: "#555", fontSize: 14, fontWeight: 500 }}
                    tickLine={true}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Legend content={CustomLegend} />
                {idolNames.map((name, index) => (
                    <Line
                        key={name}
                        type="monotone"
                        dataKey={name}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}