import { useState, useEffect } from "react";
import { getFullWriteData } from "@/util/getFetcher";

export default function useGetFullWrite(){
    const [writeData, setWriteData] = useState([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFullWriteData();
                setWriteData(result);
            }
            catch (e: unknown) {
                if(e instanceof Error){
                    setIsError(true);
                }
            }
            finally {
                setIsLoad(false);
            }
        };
        fetchData();
    }, []);

    return { writeData, isLoad, isError, setWriteData };
}