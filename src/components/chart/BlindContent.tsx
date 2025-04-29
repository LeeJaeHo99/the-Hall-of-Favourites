interface BlindContentPropsType{
    name: string;
    sum: number;
}

export default function BlindContent({ top5 }: BlindContentPropsType) {
    const colors: string[] = ["#ffcc49","#cdd0d4", "#c19a6b", "#d1de74", "#f1a183"];
    const emoji: string[] = ["🥇", "🥈", "🥉", "💪", "💪"];

    return (
        <div className="blind-content blur-box">
            <p>🔒 현재는 블라인드 투표시간 입니다 🔒</p>
            <p>(아래는 PM 10:00 까지의 기록입니다)</p>
            <div className="blind-rank--wrap">
                {top5.map((idolItem, i) => (
                    <div key={idolItem.name}>
                        <span className="name" style={{color: `${colors[i]}`}}>
                            {emoji[i]} {idolItem.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}