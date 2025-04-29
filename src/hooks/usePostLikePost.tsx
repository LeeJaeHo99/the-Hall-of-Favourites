import { useState } from "react";
import { postLikePost } from "@/util/postFetcher";

export default function usePostLikePost() {
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async (id: string) => {
        try {
            const result = await postLikePost({ id });
            setIsPost(true);
            return result;
        }
        catch (e: unknown) {
            if(e instanceof Error){
                setIsPostError(true);
            }
        } 
        finally {
            setIsPost(false);
        }
    };

    return { postHandler, isPost, isPostError };
}