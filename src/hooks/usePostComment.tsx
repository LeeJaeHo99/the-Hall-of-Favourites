import { useState } from "react";
import { postCommentData } from "@/util/postFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function usePostComment() {
    const [loadPostComment, setLoadPostComment] = useState<boolean>(true);
    const [errorPostComment, setErrorPostComment] = useState<string | null>(null);

    const postHandler = async ({ id, name, text, pw }) => {
        setLoadPostComment(true);
        setErrorPostComment(null);

        try {
            const result = await postCommentData({ id, name, text, pw });
            return result;
        }
        catch (e) {
            setErrorPostComment(getErrorMessage(e));
        } 
        finally {
            setLoadPostComment(false);
        }
    };

    return { postHandler, loadPostComment, errorPostComment };
}