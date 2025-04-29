import { useState } from "react";
import { patchEditWrite } from "@/util/patchFetcher";

export default function usePatchWrite() {
    const [isPatch, setIsPatch] = useState<boolean>(true);
    const [isPatchError, setIsPatchError] = useState<boolean>(false);

    const patchHandler = async (editData) => {
        try {
            const result = await patchEditWrite(editData);
            return result;
        } catch (error) {
            setIsPatchError(true);
            throw error;
        } finally {
            setIsPatch(false);
        }
    };

    return { patchHandler, isPatch, isPatchError };
}
