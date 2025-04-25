import { useState } from "react";
import { patchLikeMember } from "@/util/patchFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function usePatchLikeMember() {
    const [loadPathchLikeMem, setLoadPathchLikeMem] = useState<boolean>(true);
    const [errorPathchLikeMem, setErrorPathchLikeMem] = useState<string | null>(null);

    const patchHandler = async (name: string) => {
        setLoadPathchLikeMem(true);
        setErrorPathchLikeMem(null);

        try {
            const result = await patchLikeMember(name);
            return result;
        }
        catch (e) {
            setErrorPathchLikeMem(getErrorMessage(e));
        } 
        finally {
            setLoadPathchLikeMem(false);
        }
    };

    return { patchHandler, loadPathchLikeMem, errorPathchLikeMem };
}