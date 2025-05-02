import { FetchDataType } from "@/types/types";

interface BodyType{
    [key: string]: string;
}

async function postFetcher(api: string, body: BodyType) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/${api}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        if (!res.ok) {
            const result = await res.json().catch(() => null);
            throw new Error(result?.message || "데이터 전송에 실패했습니다.");
        }

        const result = await res.json();

        if (!result) {
            throw new Error("서버에서 유효한 데이터를 받지 못했습니다.");
        }

        return result?.data;
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(e.message || "요청 중 오류가 발생했습니다.");
        }
    }
}

// POST LIKE-POST
export const postLikePost = ({ id }: FetchDataType) => {
    return postFetcher("likePost", { postId: id });
};

// POST WRITE
export const postWriteData = ({title, content, writer, pw}: FetchDataType) => {
    return postFetcher("postWrite", {
        title: title,
        content: content,
        writer: writer,
        pw: pw,
    });
};

// POST COMMENT
export const postCommentData = ({ id, name, text, pw }: FetchDataType) => {
    return postFetcher("postComment", {
        postId: id,
        name: name,
        text: text,
        pw: pw,
    });
};

// POST CHEER MSG
export const postCheerMsgData = ({ text }: FetchDataType) => {
    return postFetcher("postCheerMessage", {
        cheerMsg: text,
    });
};