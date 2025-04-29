import { useState, useEffect } from "react";
import { getGroupData } from "@/util/getFetcher";

export default function useGetGroup() {
    const [groupData, setGroupData] = useState();
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getGroupData();
                setGroupData(result);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoad(false);
            }
        };
        fetchData();
    }, []);

    return { groupData, isLoad, isError };
}
