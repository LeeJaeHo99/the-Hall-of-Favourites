import { useState } from "react";
import { patchLikeMember } from "@/util/patchFetcher";

export default function usePatchLikeMember() {
    const [isPatch, setIsPatch] = useState<boolean>(true);
    const [isPatchError, setIsPatchError] = useState<boolean>(false);

    const patchHandler = async (name: string) => {
        try {
            const result = await patchLikeMember(name);
            return result;
        }
        catch (e) {
            setIsPatchError(true);
        } 
        finally {
            setIsPatch(false);
        }
    };

    return { patchHandler, isPatch, isPatchError };
}