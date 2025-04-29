import { useState } from "react";
import { deleteComment } from "@/util/deleteFetcher";

export default function useDeleteCommnet(){
    const [isDeleteLoad, setisDeleteLoad] = useState<boolean>(true);
    const [isDeleteError, setisDeleteError] = useState<boolean>(false);

    const deleteHandler = async (param: number, index: number, pw: string) => {
        try {
            const result = await deleteComment(param, index, pw);
            return result;
        } catch (e) {
            setisDeleteError(true);
        } finally {
            setisDeleteLoad(false);
        }
    };

    return { deleteHandler, isDeleteLoad, isDeleteError };
}