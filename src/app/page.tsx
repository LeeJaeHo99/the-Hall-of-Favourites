import Inner from "@/components/Inner";
import Winner from "@/components/Winner";
import SearchBar from "@/components/SearchBar";
import GroupLinkBtn from "@/components/GroupLinkBtn";
import BoardPreview from "@/components/BoardPreview";
import VictoryHistory from "@/components/VictoryHistory";
import RankingSection from "@/components/section/RankingSection";
import Title from "@/components/Title";

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

function SearchSection() {
    return (
        <section className="page-section search-section">
            <Title
                title={"나의 최애 검색"}
                desc={"검색하시면 최애의 페이지로 이동합니다."}
            />
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
                <Title title={"자유게시판"} moreView={true} />
                <BoardPreview />
            </div>
            <div className="history-part">
                <Title title={"역대 우승 TOP3"} moreView={false} />
                <VictoryHistory />
            </div>
        </section>
    );
}