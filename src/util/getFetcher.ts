async function getFetcher(api: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${api}`);

        if (!res.ok) {
            const result = await res.json().catch(() => null);
            throw new Error(result?.message || "데이터를 불러오는 데 실패했습니다.");
        }

        const result = await res.json();
        
        if (!result?.data) throw new Error("서버에서 유효한 데이터를 받지 못했습니다.");
        return result.data;
    } 
    catch (error) {
        throw new Error(error.message || "네트워크 오류가 발생했습니다.");
    }
}

// FULL-MEMBER
export const getFullMemberData = () => {
    return getFetcher("getMember?full=true");
};

// MEMBER
export const getMemberData = () => {
    return getFetcher("getMember");
};

// Full-Group
export const getFullGroupData = () => {
    return getFetcher("getGroup?full=true");
};

// Group
export const getGroupData = () => {
    return getFetcher("getGroup");
};

// FULL-WRITE
export const getFullWriteData = () => {
    return getFetcher("getWrite?full=true");
};

// WRITE
export const getWriteData = () => {
    return getFetcher("getWrite");
};

// NOTICE
export const getNoticeData = () => {
    return getFetcher("getNotice");
};