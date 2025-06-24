import { useState } from "react";
import { patchEditWrite } from "@/util/patchFetcher";
import { FetchDataType } from '../types/common';

export default function usePatchWrite() {
    const [isPatch, setIsPatch] = useState<boolean>(false);
    const [isPatchError, setIsPatchError] = useState<boolean>(false);

    const patchHandler = async (editData: FetchDataType) => {
        try {
            const result = await patchEditWrite(editData);
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
