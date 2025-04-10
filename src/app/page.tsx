import Inner from "@/components/Inner";
import Winner from "@/components/Winner";
import Table from "@/components/Table";

export default function Home() {
    return (
        <div className="home">
            <Inner x={"center"} y={"column"}>
                <Winner group={`aespa`} singer={`karina`} />
                <RankingSection />
            </Inner>
        </div>
    );
}

function RankingSection() {
    const rank = [
        { name: "카리나", group: "에스파", voteCount: 100, id: 0 },
        { name: "장원영", group: "아이브", voteCount: 90, id: 1 },
        { name: "윈터", group: "에스파", voteCount: 80, id: 2 },
        { name: "지젤", group: "에스파", voteCount: 70, id: 3 },
        { name: "닝닝", group: "에스파", voteCount: 60, id: 4 },
    ];

    return (
        <section className="page-section now-ranking">
            <div className="title-wrap">
                <div className="section-title">현재 순위 TOP 5</div>
                <div className="section-desc">
                    매 시간 정각에 순위가 업데이트 됩니다.
                </div>
            </div>
            <Table
                head={["순위", "이름", "그룹", "투표수"]}
                body={rank}
                columns={["name", "group", "voteCount"]}
            />
        </section>
    );
}
