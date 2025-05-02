import { useState } from "react";
import { postCheerMsgData } from "@/util/postFetcher";
import { FetchDataType } from '../types/types';

export default function usePostCheerMsg(){
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async ({ text, query }: FetchDataType) => {
        try {
            const result = await postCheerMsgData({ text, query });
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