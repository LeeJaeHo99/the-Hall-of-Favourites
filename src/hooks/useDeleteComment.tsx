import { useState } from "react";
import { deleteComment } from "@/util/deleteFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useDeleteCommnet(){
    const [loadDeleteComment, setLoadDeleteComment] = useState<boolean>(true);
    const [errorDeleteComment, setErrorDeleteComment] = useState<string>('');

    const deleteHandler = async (param: number, index: number, pw: string) => {
        setLoadDeleteComment(true);
        setErrorDeleteComment("");

        try {
            await deleteComment(param, index, pw);
        } catch (err) {
            setErrorDeleteComment(getErrorMessage(err));
        } finally {
            setLoadDeleteComment(false);
        }
    };

    return { deleteHandler, loadDeleteComment, errorDeleteComment };
}