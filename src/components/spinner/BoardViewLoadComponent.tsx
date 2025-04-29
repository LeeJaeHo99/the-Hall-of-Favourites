import Inner from "@/components/ui/Inner";
import LoadSpinner from "./LoadSpinner";

export default function BoardViewLoadComponent() {
    return (
        <div className="BoardViewPage sub-page">
            <Inner x={"center"} y={"column"}>
                <div className="board-content blur-box">
                    <LoadSpinner />
                </div>
            </Inner>
        </div>
    );
}
