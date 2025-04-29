import { useState, useEffect } from "react";
import { getNoticeData } from "@/util/getFetcher";

interface NoticeDataType {
    title: string;
    content: string;
}

export default function useGetNotice(){
    const [noticeData, setNoticeData] = useState<NoticeDataType | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getNoticeData();
                setNoticeData(result[0]);
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

    return { noticeData, isLoad, isError, setNoticeData };
}