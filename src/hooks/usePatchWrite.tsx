import { useState } from "react";
import { patchEditWrite } from "@/util/patchFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function usePatchWrite() {
    const [isPatching, setIsPatching] = useState(false);
    const [patchError, setPatchError] = useState<string>("");

    const patchHandler = async (editData) => {
        setIsPatching(true);
        setPatchError("");

        try {
            const result = await patchEditWrite(editData);
            return result;
        } catch (error) {
            setPatchError(getErrorMessage(error.message));
            throw error;
        } finally {
            setIsPatching(false);
        }
    };

    return { patchHandler, isPatching, patchError };
}
