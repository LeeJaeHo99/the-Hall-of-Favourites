import { useState, useEffect } from "react";
import { getFullWriteData } from "@/util/fetchData";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useGetFullWrite(){
    const [writeData, setWriteData] = useState([]);
    const [loadFullWrite, setLoadFullWrite] = useState<boolean>(true);
    const [errorFullWrite, setErrorFullWrite] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFullWriteData();
                setWriteData(result);
            } catch (e) {
                setErrorFullWrite(getErrorMessage(e));
            } finally {
                setLoadFullWrite(false);
            }
        };
        fetchData();
    }, []);

    return { writeData, loadFullWrite, errorFullWrite, setWriteData };
}