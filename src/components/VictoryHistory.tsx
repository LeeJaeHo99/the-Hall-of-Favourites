import Image from "next/image";

interface Rank {
    name: string;
    group: string;
    history: number;
}

export default function VictoryHistory() {
    const rank: Rank[] = [
        { name: "karina", group: "aespa", history: 27 },
        { name: "karina", group: "aespa", history: 24 },
        { name: "karina", group: "aespa", history: 16 },
    ];

    return (
        <div className="victory-history blur-box">
            <div className="silver">
                <Profile
                    name={rank[1].name}
                    group={rank[1].group}
                    history={rank[1].history}
                />
                <div className="box">🥈</div>
                <div className="box"></div>
            </div>
            <div className="gold">
                <Profile
                    name={rank[0].name}
                    group={rank[0].group}
                    history={rank[0].history}
                />
                <div className="box">🥇</div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            <div className="bronze">
                <Profile
                    name={rank[2].name}
                    group={rank[2].group}
                    history={rank[2].history}
                />
                <div className="box">🥉</div>
            </div>
        </div>
    );
}

function Profile({ name, group, history }) {
    return (
        <div className="profile">
            <Image
                src={`/images/${group}/${name}.png`}
                width={60}
                height={60}
                alt="프로필 이미지"
            />
            <span>{name}</span>
            <div className="victory-num">역대 {history}회 우승 🏆</div>
        </div>
    );
}
