import { useState, useEffect } from "react";
import { getGroupData } from "@/util/fetchData";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useGetGroup() {
    const [groupData, setGroupData] = useState();
    const [loadGroup, setLoadGroup] = useState<boolean>(true);
    const [errorGroup, setErrorGroup] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getGroupData();
                setGroupData(result);
            } catch (e) {
                setErrorGroup(getErrorMessage(e));
            } finally {
                setLoadGroup(false);
            }
        };
        fetchData();
    }, []);

    return { groupData, loadGroup, errorGroup };
}
