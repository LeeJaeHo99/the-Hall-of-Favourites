import { useState } from "react";
import { postWriteData } from "@/util/postFetcher";

export default function usePostWrite() {
    const [isPost, setIsPost] = useState<boolean>(true);
    const [isPostError, setIsPostError] = useState<boolean>(false);

    const postHandler = async (title, content, writer, pw) => {
        try {
            const result = await postWriteData({ title, content, writer, pw });
            return result;
        }
        catch (e) {
            setIsPostError(false);
        } 
        finally {
            setIsPost(false);
        }
    };

    return { postHandler, isPost, isPostError };
}