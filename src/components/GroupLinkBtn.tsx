import Link from "next/link";

export default async function GroupLinkBtn() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getGroup`);
    const result = await res.json();
    const groupData = result.data;
    console.log('groupData: ', groupData);

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
