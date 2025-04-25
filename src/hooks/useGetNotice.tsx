import { useState, useEffect } from "react";
import { getNoticeData } from "@/util/getFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";

export default function useGetNotice(){
    const [noticeData, setNoticeData] = useState([]);
    const [loadFullNotice, setLoadFullNotice] = useState<boolean>(true);
    const [errorFullNotice, setErrorFullNotice] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getNoticeData();
                setNoticeData(result[0]);
            } catch (e) {
                setErrorFullNotice(getErrorMessage(e));
            } finally {
                setLoadFullNotice(false);
            }
        };
        fetchData();
    }, []);

    return { noticeData, loadFullNotice, errorFullNotice, setNoticeData };
}