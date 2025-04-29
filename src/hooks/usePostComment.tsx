import { useState } from "react";
import { postCommentData } from "@/util/postFetcher";
import { FetchDataType } from '../types/types';

export default function usePostComment() {
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async ({ id, name, text, pw }: FetchDataType) => {
        try {
            const result = await postCommentData({ id, name, text, pw });
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