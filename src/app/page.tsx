import Inner from "@/components/ui/Inner";
import VictoryHistory from "@/components/ui/VictoryHistory";
import RankingSection from "@/components/section/RankingSection";
import Title from "@/components/ui/Title";
import GroupLinkBtn from "@/components/ui/GroupLinkBtn";
import SearchBar from "@/components/ui/SearchBar";
import BoardPreview from "@/components/ui/BoardPreview";
import Winner from "@/components/ui/Winner";
import NoticeModal from '../components/ui/NoticeModal';

export default function Home() {
    return (
        <div className="home">
            <Inner x={"center"} y={"column"}>
            <NoticeModal/>
                <Winner/>
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