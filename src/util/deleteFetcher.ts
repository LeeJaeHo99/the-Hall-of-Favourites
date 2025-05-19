async function deleteFetcher(api: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/${api}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const result = await res.json().catch(() => null);
            throw new Error(result?.message || "삭제에 실패했습니다.");
        }

        if (res.status === 204) return;

        const result = await res.json();
        return result?.data;
    } catch (e: unknown) {
        if(e instanceof Error){
            throw new Error(e.message || "삭제 중 오류가 발생했습니다.");
        }
    }
}

// WRITE
export const deleteWrite = (id: string, pw: string) => {
    return deleteFetcher(`deleteWrite?postId=${id}&inputPw=${pw}`);
};

// COMMENT
export const deleteComment = (param: number, index: number, pw: string) => {
    return deleteFetcher(`deleteComment?postId=${param}&commentIndex=${index}&inputPw=${pw}`);
};