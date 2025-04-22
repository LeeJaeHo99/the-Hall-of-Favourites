import { AdminContentProps } from "@/types/types";
import PersonalInfo from "./PersonalInfo";

export default function AdminContent({ clickIdx }: AdminContentProps) {
    return (
        <div className="admin-content blur-box">
            <PersonalInfo content={clickIdx} />
        </div>
    );
}
