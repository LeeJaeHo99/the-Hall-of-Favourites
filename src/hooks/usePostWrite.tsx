import { useState } from "react";
import { postWriteData } from "@/util/postFetcher";

export default function usePostWrite() {
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async (title: string, content: string, writer: string, pw: string) => {
        try {
            const result = await postWriteData({ title, content, writer, pw });
            setIsPost(true);
            return result;
        }
        catch (e: unknown) {
            if(e instanceof Error){
                setIsPostError(false);
            }
        } 
        finally {
            setIsPost(false);
        }
    };

    return { postHandler, isPost, isPostError };
}