import RadioBtn from "../RadioBtn";
import { AdminBtnProps } from '../../types/types';

const btnId = [
    "멤버 데이터 관리",
    "멤버 데이터 추가",
    "그룹 데이터 관리",
    "그룹 데이터 추가",
    "게시판 데이터 관리",
];

const radioName = "adminBtn";

interface AdminBtnProps {
    onClick: (i: number) => void;
    selectedIdx: number;
}

export default function AdminBtn({onClick, selectedIdx}: AdminBtnProps) {
    return (
        <div className="admin-btn blur-box">
            {btnId.map((content, i) => (
                <RadioBtn
                    onClick={() => onClick(i)}
                    key={content}
                    id={content}
                    name={radioName}
                    checked={selectedIdx === i}
                />
            ))}
        </div>
    );
}
