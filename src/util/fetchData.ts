import {
    PostWriteType,
    PostCommentType,
    PostLikePostType,
    PatchEditWriteType,
} from "@/types/types";

async function fetchLogic(api: string, option = {}) {
    let res;
    try {
        res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/${api}`,
            option
        );
    } catch (e) {
        throw new Error("네트워크 연결에 실패했습니다.");
    }

    if (!res.ok) {
        let errorMessage = "네트워크 오류가 발생하였습니다.";
        try {
            const errorData = await res.json();
            if (errorData?.message) errorMessage = errorData.message;
        } catch {
            console.error("JSON 파싱 실패");
        }
        throw new Error(errorMessage);
    }

    let result;
    try {
        result = await res.json();
    } catch (e: unknown) {
        throw new Error("서버 응답을 해석할 수 없습니다.");
    }

    if (!result?.data) {
        throw new Error("서버에서 올바른 데이터를 받지 못했습니다.");
    }

    return result.data;
}

// GET FULL-MEMBER
export const getFullMemberData = () => {
    return fetchLogic("getMember?full=true");
};

// GET MEMBER
export const getMemberData = () => {
    return fetchLogic("getMember");
};

// GET Full-Group
export const getFullGroupData = () => {
    return fetchLogic("getGroup?full=true");
};

// GET Group
export const getGroupData = () => {
    return fetchLogic("getGroup");
};

// GET FULL-WRITE
export const getFullWriteData = () => {
    return fetchLogic("getWrite?full=true");
};

// GET WRITE
export const getWriteData = () => {
    return fetchLogic("getWrite");
};

// GET NOTICE
export const getNoticeData = () => {
    return fetchLogic("getNotice");
};

// POST LIKE-POST
export const postLikePost = ({ id }: PostLikePostType) => {
    return fetchLogic("likePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id }),
    });
};

// POST WRITE
export const postWriteData = ({
    title,
    content,
    writer,
    pw,
}: PostWriteType) => {
    return fetchLogic("postWrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            content: content,
            writer: writer,
            pw: pw,
        }),
    });
};
// POST COMMENT
export const postCommentData = ({ id, name, text, pw }: PostCommentType) => {
    return fetchLogic("postComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            postId: id,
            name: name,
            text: text,
            pw: pw,
        }),
    });
};

// PATCH LIKE-MEMBER
export const patchLikeMember = (name: string) => {
    return fetchLogic(`likeMember?q=${encodeURIComponent(name)}`, { method: "PATCH" });
};

// PATCH EDIT-WRITE
export const patchEditWriteData = ({
    id,
    title,
    content,
    writer,
    pw,
}: PatchEditWriteType) => {
    return fetchLogic("editWrite", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            title: title,
            content: content,
            writer: writer,
            pw: pw,
        }),
    });
};

// DELETE WRITE
export const deleteWrite = (id: string, pw: number) => {
    return fetchLogic(
        `deleteWrite?postId=${id}&inputPw=${pw}`,
        { method: "DELETE" }
    );
};

// DELETE COMMENT
export const deleteComment = (param: number, index: number, pw: number) => {
    return fetchLogic(
        `/api/deleteComment?postId=${param}&commentIndex=${index}&inputPw=${pw}`,
        { method: "DELETE" }
    );
};
