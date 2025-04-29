import Title from "@/components/ui/Title";
import BoardPreview from "@/components/ui/BoardPreview";
import VictoryHistory from "@/components/ui/VictoryHistory";

export default function ContentSection() {
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