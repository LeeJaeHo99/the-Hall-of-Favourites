import Inner from "@/components/ui/Inner";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <Inner x="left">
                <h2>
                    <Link href={"/"} className="title">최애의 전당</Link>
                </h2>
                <div className="link-wrap">
                    <p>문의사항: ljhdlwogh0104@gmail.com</p>
                    <p>- 추가를 원하시는 멤버가 있으면 문의 부탁드립니다 -</p>
                    <Link href={'/board'}>자유게시판</Link>
                </div>
            </Inner>
        </footer>
    );
}
