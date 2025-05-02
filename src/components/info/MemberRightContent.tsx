import CheerMessageWrite from "./CheerMessageWrite";
import { MemberType } from '@/types/types';

interface RightContentProps {
    memberData: MemberType;
}

export default function RightContent({ memberData }: RightContentProps) {
    const title = [
        "이름: ",
        "그룹: ",
        "소속: ",
        "데뷔일: ",
        "생일: ",
        "나이: ",
    ];
    const data = [
        memberData?.nameKo[0],
        memberData?.group[2],
        memberData?.company,
        memberData?.debutDate,
        memberData?.birth,
        memberData?.age,
    ];
    return (
        <div className="right-content--wrap">
            <div className="profile-info blur-box">
                <h2>프로필</h2>
                {title.map((titleData, i) => (
                    <div key={i}>
                        <div className="title">{titleData}</div>
                        <div className="info">{data[i]}</div>
                    </div>
                ))}
            </div>
            <CheerMessageWrite memberName={memberData?.nameKo[0]}/>
        </div>
    );
}
