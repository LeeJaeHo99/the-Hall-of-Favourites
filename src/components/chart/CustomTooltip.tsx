export default function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip blur-box">
                <p className="time">⏰ {label} ⏰</p>
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