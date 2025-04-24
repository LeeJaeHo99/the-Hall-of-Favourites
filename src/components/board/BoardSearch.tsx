import Image from "next/image";

export default function BoardSearch({searchWord, onChangeSearchWord, isSearch, setIsSearch}) {
    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            if(searchWord === ''){
                alert('검색어를 입력해주세요.');
                return;
            }

            setIsSearch(false);

            setTimeout(() => {
                setIsSearch(true);
            }, 1);
        }
    }
    const onClickBtn = () => {
        if(searchWord === ''){
            alert('검색어를 입력해주세요.');
            return;
        }
        setIsSearch(false);

        setTimeout(() => {
            setIsSearch(true);
        }, 1);
    }

    return (
        <div className="board-search--component">
            <input
                value={searchWord}
                onChange={onChangeSearchWord}
                onKeyDown={onKeyDown}
                type="text"
                placeholder="검색어를 입력해주세요."
            />
            <button onClick={onClickBtn}>
                <Image
                    src={"/icons/search.png"}
                    width={16}
                    height={16}
                    alt="검색 아이콘"
                />
            </button>
        </div>
    );
}