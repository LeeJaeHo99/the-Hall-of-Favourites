import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// 📀 COMPONENT
import Title from "@/components/ui/Title";
import Inner from "@/components/ui/Inner";
import Category from "@/components/ui/Category";
import BoardEdit from "@/components/board/BoardEdit";
import BoardSearch from "@/components/board/BoardSearch";
import Pagination from "@/components/board/Pagination";

const loadFn = () => {
    console.log("loading");
};

export default function BoardSkeleton() {
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
                                link={"write"}
                            />
                            <BoardSearch
                                searchWord={""}
                                onChangeSearchWord={loadFn}
                                isSearch={""}
                                setIsSearch={loadFn}
                            />
                        </div>
                        <Category
                            category={""}
                            clickLeft={loadFn}
                            clickRight={loadFn}
                            leftText={"최신글"}
                            rightText={"인기순"}
                        />
                    </div>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx}>
                            <Skeleton
                                height={32}
                                style={{ marginBottom: 8 }}
                            />
                        </div>
                    ))}
                    <Pagination
                        data={''}
                        pagination={''}
                        setPagination={loadFn}
                    />
                </div>
            </Inner>
        </div>
    );
}
