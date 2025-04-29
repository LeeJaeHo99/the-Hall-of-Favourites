import { useState } from "react";
import { patchLikeMember } from "@/util/patchFetcher";

export default function usePatchLikeMember() {
    const [isPatch, setIsPatch] = useState<boolean>(false);
    const [isPatchError, setIsPatchError] = useState<boolean>(false);

    const patchHandler = async (name: string) => {
        try {
            const result = await patchLikeMember(name);
            setIsPatch(true);
            return result;
        }
        catch (e: unknown) {
            if(e instanceof Error){
                setIsPatchError(true);
            }
        }
        finally {
            setIsPatch(false);
        }
    };

    return { patchHandler, isPatch, isPatchError };
}