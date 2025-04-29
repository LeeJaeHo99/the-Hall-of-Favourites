import Inner from "@/components/ui/Inner";
import NoticeModal from '../components/ui/NoticeModal';
import Winner from "@/components/ui/Winner";
import RankingSection from "@/components/section/RankingSection";
import SearchSection from "@/components/section/SearchSection";
import ContentSection from "@/components/section/ContentSection";

export default function Home() {
    return (
        <div className="home">
            <Inner x={"center"} y={"column"}>
                {/* <NoticeModal/>  */}
                <Winner/>
                <RankingSection />
                <SearchSection />
                <ContentSection />
            </Inner>
        </div>
    );
}