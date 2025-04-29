import Title from "@/components/ui/Title";
import Inner from "../ui/Inner";
import LoadSpinner from "./LoadSpinner";

export default function RankingLoadComponent() {
    return (
        <section className="page-section ranking-section">
            <Title
                title={"현재 TOP 5"}
                desc={"매 시간 정각에 순위가 업데이트 됩니다."}
            />
            <Inner>
                <LoadSpinner />
            </Inner>
        </section>
    );
}
