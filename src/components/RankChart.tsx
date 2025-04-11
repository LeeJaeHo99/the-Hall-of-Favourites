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

const colors = ["#ffcc49","#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];
const emoji: string[] = ['🥇', '🥈', '🥉', '💪','💪',];

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
                    tickLine={true} // 눈금 선 없앰
                />
                <Tooltip cursor={false}/>
                <Legend content={CustomLegend}/>
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

function CustomLegend({ payload }) {
    return (
        <ul className="chart-legend">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} className="">
                    <span>{emoji[index]}</span>
                    <span style={{color: `${colors[index]}`}}>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
}