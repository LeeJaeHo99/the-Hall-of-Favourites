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
        const sortedPayload = [...payload].sort((a, b) => {
            const aVal = typeof a.value === 'number' ? a.value : 0;
            const bVal = typeof b.value === 'number' ? b.value : 0;
            return bVal - aVal;
        });

        return (
            <div className="chart-tooltip blur-box" style={{ padding: "16px" }}>
                <div>
                    {sortedPayload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
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