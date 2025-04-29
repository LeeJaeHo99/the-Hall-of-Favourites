import { useState, useEffect } from "react";
import { getFullMemberData } from "@/util/getFetcher";
import { MemberDataType } from '@/types/types';

export default function useGetFullMember() {
    const [memberData, setMemberData] = useState<MemberDataType[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFullMemberData();
                setMemberData(result);
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

    return { memberData, isLoad, isError, setMemberData };
};