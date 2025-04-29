import { useState, useEffect } from "react";
import { getFullMemberData } from "@/util/getFetcher";

export default function useGetFullMember() {
    const [memberData, setMemberData] = useState([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFullMemberData();
                setMemberData(result);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoad(false);
            }
        };
        fetchData();
    }, []);

    return { memberData, isLoad, isError, setMemberData };
};