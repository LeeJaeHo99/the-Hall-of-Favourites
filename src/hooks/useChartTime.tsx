'use client';

import { useState, useEffect } from "react";
import { checkIsBlindTime, checkIsCollectingTime, checkIsAnounceTime } from "@/util/setChartTime";

export default function useChartTime(){
    const [isBlindTime, setIsBlindTime] = useState<boolean>(checkIsBlindTime());
    const [isCollectingTime, setIsCollectingTime] = useState<boolean>(checkIsCollectingTime());
    const [isAnouncingTime, setIsAnouncingTime] = useState<boolean>(checkIsAnounceTime());

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