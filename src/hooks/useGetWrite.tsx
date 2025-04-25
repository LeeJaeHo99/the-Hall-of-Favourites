import { useState, useEffect } from "react";
import { getWriteData } from "@/util/getFetcher";
import { getErrorMessage } from "@/util/setErrorMsg";
import { WriteType } from '../types/types';

export default function useGetWrite() {
    const [writeData, setWriteData] = useState<WriteType[]>();
    const [recentWrite, setRecentWrite] = useState<WriteType[]>([]);
    const [likeSortedWrite, setLikeSortedWrite] = useState<WriteType[]>([]); 
    const [loadWrite, setLoadWrite] = useState<boolean>(true);
    const [errorWrite, setErrorWrite] = useState<string>('null');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getWriteData();
                setWriteData(result);
            } catch (e) {
                setErrorWrite(getErrorMessage(e));
            } finally {
                setLoadWrite(false);
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

    return { recentWrite, likeSortedWrite, loadWrite, errorWrite, setRecentWrite, setLikeSortedWrite };
}
