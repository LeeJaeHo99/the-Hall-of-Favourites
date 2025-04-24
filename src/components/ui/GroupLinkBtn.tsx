import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

export default async function GroupLinkBtn() {
    let groupData = [];

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getGroup`);
        
        if (!res.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
        }

        const result = await res.json();
        groupData = result.data;
    }
    catch(e){
        console.error('그룹 데이터를 불러오는 중 오류가 발생하였습니다', e);
        return <ErrorMessage text={'그룹 데이터를 불러오는 중 오류가 발생하였습니다.'}/>;
    }
    
    return (
        groupData.map((group) => (
        <Link
            key={group.nameEn[0]}
            href={`/group?q=${group.nameEn[0]}`}
            className="group-link-btn blur-box"
        >
            {group.nameEn[1]}
        </Link>
        ))
    );
}
