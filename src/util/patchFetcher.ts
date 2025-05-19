import { FetchDataType } from "../types/types";

async function patchFetcher(api: string, body: FetchDataType) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/${api}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        if (!res.ok) {
            const result = await res.json().catch(() => null);
            throw new Error(result?.message || "데이터 수정에 실패했습니다.");
        }

        const result = await res.json();
        if (!result?.data) {
            throw new Error("수정된 데이터를 받지 못했습니다.");
        }
        return result.data;
    }
    catch (e: unknown) {
        if(e instanceof Error){
            throw new Error(e.message || "수정 요청 중 오류가 발생했습니다.");
        }
    }
}

// PATCH LIKE-MEMBER
export const patchLikeMember = async (name: string) => {
    try {
        const data = await patchFetcher(
            `likeMember?q=${encodeURIComponent(name)}`,
            { method: "PATCH" }
        );
        return data;
    } catch (e) {
        if(e instanceof Error){
            alert(e.message || "오류가 발생했어요.");
        }
    }
};

// PATCH EDIT-WRITE
export const patchEditWrite = ({
    id,
    title,
    content,
    writer,
    pw,
}: FetchDataType) => {
    return patchFetcher("editWrite", { id, title, content, writer, pw });
};
