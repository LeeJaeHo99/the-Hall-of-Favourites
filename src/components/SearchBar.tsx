"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SearchBar() {
    const [option, setOption] = useState(true);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value === "singer");
        setSearch("");
    };

    const handleSearchKeyword = (e) => {
        setSearch(e.target.value);
    };

    const searchSubmit = () => {
        router.push(option ? `/member/${search}` : `/group/${search}`);
    };

    return (
            <div className="search-bar">
                <div>
                    <select onChange={handleSelectChange}>
                        <option value="singer">멤버</option>
                        <option value="group">그룹</option>
                    </select>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchKeyword}
                        placeholder={
                            option
                                ? `검색하실 멤버의 이름을 적어주세요.`
                                : "검색하실 그룹명을 적어주세요."
                        }
                    />
                </div>
                <button onClick={searchSubmit}>
                    <Image
                        src={"/icons/search.png"}
                        width={20}
                        height={20}
                        alt="검색 아이콘"
                    />
                </button>
            </div>
    );
}
