import { useState } from "react";
import { deleteComment } from "@/util/deleteFetcher";

export default function useDeleteCommnet(){
    const [isDeleteLoad, setisDeleteLoad] = useState<boolean>(true);
    const [isDeleteError, setisDeleteError] = useState<boolean>(false);

    const deleteHandler = async (param: string, index: number, pw: string) => {
        try {
            const result = await deleteComment(param, index, pw);
            return result;
        }
        catch (e: unknown) {
            if (e instanceof Error) {
                setisDeleteError(true);
            }
        }
        finally {
            setisDeleteLoad(false);
        }
    };

    return { deleteHandler, isDeleteLoad, isDeleteError };
}