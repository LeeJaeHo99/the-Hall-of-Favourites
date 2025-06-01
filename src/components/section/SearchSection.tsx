import Title from "@/components/ui/Title";
import GroupLinkBtn from "@/components/ui/GroupLinkBtn";
// import SearchBar from "@/components/ui/SearchBar";

export default function SearchSection() {
    return (
        <section className="page-section search-section">
            <Title
                title={"나의 최애 멤버"}
                desc={"클릭하시면 최애의 페이지로 이동합니다."}
            />
            {/* <SearchBar /> */}
            <div className="group-link-btn--wrap">
                <GroupLinkBtn />
            </div>
        </section>
    );
}