import Link from "next/link";

interface MoreViewBtnPropsType{
    link: string;
}

export default function MoreViewBtn({link}: MoreViewBtnPropsType){
    return(
        <Link className="more-view--btn" href={`/${link}`}>더보기</Link>
    );
}