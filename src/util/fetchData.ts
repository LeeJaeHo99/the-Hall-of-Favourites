export const fetchFullMemberData = async () => {
    let res;
    try {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMember?full=true`);
    } 
    catch (e) {
        throw new Error("네트워크 연결에 실패했습니다.");
    }

    if (!res.ok) {
        let errorMessage = "네트워크 오류가 발생하였습니다.";
        try {
            const errorData = await res.json();
            if (errorData?.message) errorMessage = errorData.message;
        } 
        catch {
            console.error('JSON 파싱 실패');
        }
        throw new Error(errorMessage);
    }

    let result;
    try {
        result = await res.json();
    } catch (e) {
        throw new Error("서버 응답을 해석할 수 없습니다.");
    }

    if (!result?.data) {
        throw new Error("서버에서 올바른 데이터를 받지 못했습니다.");
    }

    return result.data;
};
