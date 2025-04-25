import { useState } from "react";
import { postWriteData } from "@/util/postFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function usePostWrite() {
    const [loadPostWrite, setLoadPostWrite] = useState<boolean>(true);
    const [errorPostWrite, setErrorPostWrite] = useState<string | null>(null);

    const postHandler = async (title, content, writer, pw) => {
        setLoadPostWrite(true);
        setErrorPostWrite(null);

        try {
            const result = await postWriteData({ title, content, writer, pw });
            return result;
        }
        catch (e) {
            setErrorPostWrite(getErrorMessage(e));
        } 
        finally {
            setLoadPostWrite(false);
        }
    };

    return { postHandler, loadPostWrite, errorPostWrite };
}