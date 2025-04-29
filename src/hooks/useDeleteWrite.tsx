import { useState } from "react";
import { deleteWrite } from "@/util/deleteFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useDeleteWrite(){
    const [loadDeleteWrite, setLoadDeleteWrite] = useState<boolean>(true);
    const [errorDeleteWrite, setErrorDeleteWrite] = useState<string>('');

    const deleteHandler = async (id: string, pw: string) => {
        setLoadDeleteWrite(true);
        setErrorDeleteWrite("");

        try {
            const result = await deleteWrite(id, pw);
            return result;
        } catch (err) {
            setErrorDeleteWrite(getErrorMessage(err));
        } finally {
            setLoadDeleteWrite(false);
        }
    };

    return { deleteHandler, loadDeleteWrite, errorDeleteWrite };
}