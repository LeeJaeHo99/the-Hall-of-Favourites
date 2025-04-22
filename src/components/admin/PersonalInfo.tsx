"use client";

import { useState, useEffect } from "react";
import { PersonalInfo } from '../../types/types';

export default function PersonalInfo({ content }: PersonalInfo) {
    const [memberData, setMemberData] = useState([]);
    const [groupData, setGroupData] = useState([]);

    console.log("memberData: ", memberData);
    console.log("groupData: ", groupData);

    useEffect(() => {
        // 멤버 데이터 fetch
        const fetchMember = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`);
            const result = await res.json();
            setMemberData(result.data);
        };

        // 그룹 데이터 fetch
        const groupMember = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getGroup`);
            const result = await res.json();
            setGroupData(result.data);
        };
        fetchMember();
        groupMember();
    }, []);

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