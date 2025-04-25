import { useState, useEffect } from "react";
import { getFullMemberData } from "@/util/fetchData";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useGetFullMember() {
    const [memberData, setMemberData] = useState([]);
    const [loadFullMem, setLoadFullMem] = useState<boolean>(true);
    const [errorFullMem, setErrorFullMem] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFullMemberData();
                setMemberData(result);
            } catch (e) {
                setErrorFullMem(getErrorMessage(e));
            } finally {
                setLoadFullMem(false);
            }
        };
        fetchData();
    }, []);

    return { memberData, loadFullMem, errorFullMem, setMemberData };
}
