import Link from "next/link";

export default function MoreViewBtn({link}: string){
    return(
        <Link className="more-view--btn" href={`/${link}`}>더보기</Link>
    );
}