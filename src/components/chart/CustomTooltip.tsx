interface PayloadItem {
    name: string;
    value: number | string;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: PayloadItem[];
}

export default function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip blur-box" style={{padding: "16px"}}>
                <div>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            style={{ color: entry.color }}
                        >
                            <span>{entry.name}</span>
                            <span>: {entry.value}</span>
                        </p>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}