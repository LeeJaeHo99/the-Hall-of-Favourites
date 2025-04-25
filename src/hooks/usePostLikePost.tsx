import { useState } from "react";
import { postLikePost } from "@/util/postFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function usePostLikePost() {
    const [loadPostLikePost, setLoadPostLikePost] = useState<boolean>(true);
    const [errorPostLikePost, setErrorPostLikePost] = useState<string | null>(null);

    const postHandler = async (id: string) => {
        setLoadPostLikePost(true);
        setErrorPostLikePost(null);

        try {
            const result = await postLikePost({ id });
            return result;
        }
        catch (e) {
            setErrorPostLikePost(getErrorMessage(e));
        } 
        finally {
            setLoadPostLikePost(false);
        }
    };

    return { postHandler, loadPostLikePost, errorPostLikePost };
}