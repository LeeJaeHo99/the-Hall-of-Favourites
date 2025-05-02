import { useState, useEffect } from "react";
import { getWriteData } from "@/util/getFetcher";
import { WriteDataType } from '../types/types';

export default function useGetWrite() {
    const [writeData, setWriteData] = useState<WriteDataType[]>();
    const [recentWrite, setRecentWrite] = useState<WriteDataType[] | WriteDataType>([]);
    const [likeSortedWrite, setLikeSortedWrite] = useState<WriteDataType[]>([]); 
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getWriteData();
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

    // 🤖 WORK : 최신순 / 인기순 state에 각각 데이터 추가
    useEffect(() => {
        if (!Array.isArray(writeData)) return;
        setRecentWrite([...writeData].reverse().slice(0, 5));
        setLikeSortedWrite(
            [...writeData]
                .sort((a, b) => Number(b.likeNum) - Number(a.likeNum))
                .slice(0, 5)
        );
    }, [writeData]);

    return { recentWrite, likeSortedWrite, isLoad, isError, setRecentWrite, setLikeSortedWrite };
}
