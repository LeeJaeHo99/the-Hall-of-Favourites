import { useState, useEffect } from "react";
import { getNoticeData } from "@/util/getFetcher";

export default function useGetNotice(){
    const [noticeData, setNoticeData] = useState([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getNoticeData();
                setNoticeData(result[0]);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoad(false);
            }
        };
        fetchData();
    }, []);

    return { noticeData, isLoad, isError, setNoticeData };
}