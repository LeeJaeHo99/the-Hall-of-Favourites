import { AdminContentProps } from "@/types/types";

export default function AdminContent({clickIdx}: AdminContentProps){
    return(
        <div className="admin-content blur-box">
            <span>{clickIdx}</span>
        </div>
    );
}