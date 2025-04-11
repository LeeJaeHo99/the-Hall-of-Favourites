import Inner from "@/components/Inner";
import Winner from "@/components/Winner";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import GroupLinkBtn from "@/components/GroupLinkBtn";
import BoardPreview from "@/components/BoardPreview";
import VictoryHistory from "@/components/VictoryHistory";
import MoreViewBtn from "@/components/MoreViewBtn";
import RankChart from "@/components/RankChart";

export default function Home() {
    return (
        <div className="home">
            <Inner x={"center"} y={"column"}>
                <Winner group={`aespa`} singer={`karina`} />
                <RankingSection />
                <SearchSection />
                <BoradAndHistory />
            </Inner>
        </div>
    );
}

function RankingSection() {
    const rank = [
        {
            name: "카리나",
            group: "에스파",
            voteCount: 100,
            changeInfo: 0,
            id: 0,
        },
        {
            name: "장원영",
            group: "아이브",
            voteCount: 90,
            changeInfo: 1,
            id: 1,
        },
        { name: "윈터", group: "에스파", voteCount: 80, changeInfo: 2, id: 2 },
        { name: "지젤", group: "에스파", voteCount: 70, changeInfo: 1, id: 3 },
        { name: "닝닝", group: "에스파", voteCount: 60, changeInfo: 2, id: 4 },
    ];

    return (
        <section className="page-section ranking-section">
            <div className="title-wrap">
                <div className="section-title">현재 TOP 5</div>
                <div className="section-desc">
                    매 시간 정각에 순위가 업데이트 됩니다.
                </div>
            </div>
            {/* <Table
                head={["순위", "이름", "그룹", "투표수", "변동정보"]}
                body={rank}
                columns={["name", "group", "voteCount", "changeInfo"]}
            /> */}
            <RankChart/>
        </section>
    );
}

function SearchSection() {
    return (
        <section className="page-section search-section">
            <div className="title-wrap">
                <div className="section-title">나의 최애 검색</div>
                <div className="section-desc">
                    검색하시면 최애의 페이지로 이동합니다.
                </div>
            </div>
            <SearchBar />
            <div className="group-link-btn--wrap">
                <GroupLinkBtn />
            </div>
        </section>
    );
}

function BoradAndHistory() {
    return (
        <section className="page-section board-history-section">
            <div className="borad-part">
                <div className="title-wrap">
                    <div className="title-link">
                        <div className="section-title">자유 게시판</div>
                        <MoreViewBtn link={"123"} />
                    </div>
                    <BoardPreview />
                </div>
            </div>
            <div className="history-part">
                <div className="title-wrap">
                    <div className="title-link">
                        <div className="section-title">역대 우승 순위</div>
                        <MoreViewBtn link={"123"} />
                    </div>
                    <VictoryHistory />
                </div>
            </div>
        </section>
    );
}
