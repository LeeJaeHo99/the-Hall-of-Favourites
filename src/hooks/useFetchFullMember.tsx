import { useState, useEffect } from "react";
import { fetchFullMemberData } from "@/util/fetchData";

export default function useFullMemberData() {
    const [memberData, setMemberData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFullMemberData();
                setMemberData(result);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { memberData, loading, error };
}
