import { useState } from "react";
import { postCommentData } from "@/util/postFetcher";
import { PostCommentType } from '../types/types';

export default function usePostComment() {
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async ({ id, name, text, pw }: PostCommentType) => {
        try {
            const result = await postCommentData({ id, name, text, pw });
            setIsPost(true);
            return result;
        }
        catch (e: unknown) {
            setIsPostError(true);
        } 
        finally {
            setIsPost(false);
        }
    };

    return { postHandler, isPost, isPostError };
}