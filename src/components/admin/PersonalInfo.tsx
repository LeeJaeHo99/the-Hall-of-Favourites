"use client";

import useGetFullMember from "@/hooks/useGetFullMember";
import useGetGroup from "@/hooks/useGetGroup";

export default function PersonalInfo({ content }) {
    const { memberData, loadFullMem, errorFullMem } = useGetFullMember();
    const { groupData, loadGroup, errorGroup } = useGetGroup();

    return (
        <div className="personal-info--wrap MemberInfo">
            {content === 0 && <Info content={content} data={memberData} />}
            {content === 2 && <Info content={content} data={groupData} />}
        </div>
    );
}

function Info({ content, data }) {
    return (
        <div>
            {content === 0 ? (
                <div>
                    {data.map((item) => (
                        <div className="i" key={item._id}>{item.nameKo[0]}</div>
                    ))}
                </div>
            ) : (
                <div>
                    {data.map((item) => (
                        <span key={item._id}>{item.nameKo}</span>
                    ))}
                </div>
            )}
        </div>
    );
}