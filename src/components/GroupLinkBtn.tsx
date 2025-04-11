import { groupName } from "@/data/data";
import Link from "next/link";

export default function GroupLinkBtn() {
    return groupName.map((group) => (
        <Link
            key={group.groupEn}
            href={`/group/${group.link}`}
            className="group-link-btn blur-box"
        >
            {group.groupEn}
        </Link>
    ));
}
