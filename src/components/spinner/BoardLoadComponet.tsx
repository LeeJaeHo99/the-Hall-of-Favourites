
// 📀 COMPONENT
import Inner from "@/components/ui/Inner";
import Title from "@/components/ui/Title";
import BoardEdit from "@/components/board/BoardEdit";
import BoardSearch from "@/components/board/BoardSearch";
import Category from "@/components/ui/Category";
import Pagination from "@/components/board/Pagination";
import LoadSpinner from "./LoadSpinner";

const loadFn = () => {
    console.log("loading");
};

export default function BoardLoadComponet() {
    return (
        <div className="BoardPage sub-page">
            <Inner x={"column"} y={"center"}>
                <div className="title-left">
                    <Title title={"자유 게시판"} />
                </div>
                <div className="board-content--wrap blur-box">
                    <div className="board-editor">
                        <div className="board-component--wrap">
                            <BoardEdit
                                style={"normal"}
                                text={"글쓰기"}
                            />
                            <BoardSearch
                                searchWord={""}
                                onChangeSearchWord={loadFn}
                                setIsSearch={loadFn}
                            />
                        </div>
                        <Category
                            category={true}
                            clickLeft={loadFn}
                            clickRight={loadFn}
                            leftText={"최신글"}
                            rightText={"인기순"}
                        />
                    </div>
                    <LoadSpinner/>
                    <Pagination
                        data={[]}
                        pagination={0}
                        setPagination={loadFn}
                    />
                </div>
            </Inner>
        </div>
    );
}
