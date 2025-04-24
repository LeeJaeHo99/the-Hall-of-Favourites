import Link from "next/link";
import { MoreViewBtnProps } from "@/types/types";

export default function MoreViewBtn({link}: MoreViewBtnProps){
    return(
        <Link className="more-view--btn" href={`/${link}`}>더보기</Link>
    );
}