export const fetchFullMemberData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`);

    if (!res.ok) throw new Error("네트워크 오류가 발생하였습니다.");

    const result = await res.json();
    return result.data;
};
