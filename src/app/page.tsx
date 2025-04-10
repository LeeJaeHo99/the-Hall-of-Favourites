import Inner from "@/components/Inner";
import Winner from "@/components/Winner";
import Table from "@/components/Table";

export default function Home() {
    return (
        <div className="home">
            <Inner x={"center"} y={"column"}>
                <Winner group={`aespa`} singer={`karina`} />
                <RankingSection />
                <SearchSection />
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
        <section className="page-section ranking-section">
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

function SearchSection() {
    return (
        <section className="page-section search-section">
            <div className="title-wrap">
                <div className="section-title">나의 최애 찾기</div>
                <div className="section-desc">
                    검색하시면 최애의 페이지로 이동합니다.
                </div>
            </div>
        </section>
    );
}
