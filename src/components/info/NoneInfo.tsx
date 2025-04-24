import SearchBar from "../ui/SearchBar"

export default function NoneInfo(){
    return(
        <div className="none-info--component">
            <div className="notice-text">😵 검색어가 존재하지 않습니다 😵</div>
            <div className="notice-text--sub">재검색 부탁드립니다.</div>
            <SearchBar/>
        </div>
    )
}