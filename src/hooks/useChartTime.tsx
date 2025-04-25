import { useState, useEffect } from "react";
import { checkIsBlindTime, checkIsCollectingTime, checkIsAnounceTime } from "@/util/setChartTime";

export default function useChartTime(){
    const [isBlindTime, setIsBlindTime] = useState(checkIsBlindTime());
    const [isCollectingTime, setIsCollectingTime] = useState(checkIsCollectingTime());
    const [isAnouncingTime, setIsAnouncingTime] = useState(checkIsAnounceTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlindTime(checkIsBlindTime());
            setIsCollectingTime(checkIsCollectingTime());
            setIsAnouncingTime(checkIsAnounceTime());
        }, 1000 * 10);

        return () => clearInterval(interval);
    }, []); 

    return {isBlindTime, isCollectingTime, isAnouncingTime};
}