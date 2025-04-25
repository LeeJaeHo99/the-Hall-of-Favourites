// 차트 블라인드 (PM 22:00 ~ PM 23:50)
export function checkIsBlindTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 22 || (h === 23 && m < 50);
}

// 순위 집계 (PM 23:50 ~ PM 23:59)
export function checkIsCollectingTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 23 && m >= 50 && m <= 59;
}

// 첫 타임 순위 발표 (AM 00:00 ~ AM 00:59)
export function checkIsAnounceTime(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 0 && m >= 0 && m <= 59;
}