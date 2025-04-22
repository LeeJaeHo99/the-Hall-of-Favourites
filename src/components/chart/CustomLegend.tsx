const emoji: string[] = ["🥇", "🥈", "🥉", "💪", "💪"];
const colors = ["#ffcc49", "#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];

export default function CustomLegend({ payload }) {
    return (
        <ul className="chart-legend">
            {payload.map((entry, index) => (
                <li key={`item-${index}`} className="">
                    <span>{emoji[index]}</span>
                    <span style={{ color: `${colors[index]}` }}>
                        {entry.value}
                    </span>
                </li>
            ))}
        </ul>
    );
}