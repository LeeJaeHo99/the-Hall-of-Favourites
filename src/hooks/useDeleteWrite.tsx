import { useState } from "react";
import { deleteWrite } from "@/util/deleteFetcher";

export default function useDeleteWrite(){
    const [isDeleteLoad, setisDeleteLoad] = useState<boolean>(false);
    const [isDeleteError, setisDeleteError] = useState<boolean>(false);

    const deleteHandler = async (id: string, pw: string) => {
        try {
            const result = await deleteWrite(id, pw);
            setisDeleteLoad(true);
            return result;
        } catch (e) {
            setisDeleteError(true);
        } finally {
            setisDeleteLoad(false);
        }
    };

    return { deleteHandler, isDeleteLoad, isDeleteError };
}