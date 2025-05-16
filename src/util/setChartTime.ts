// 차트 블라인드 (PM 22:00 ~ PM 23:50)
export function checkIsBlindTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 22 || (h === 23 && m < 50);

    // test
    // return h === 13 || (h === 13 && m < 59);
}

// 순위 집계 (PM 23:50 ~ PM 23:59)
export function checkIsCollectingTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 23 && m >= 50 && m <= 59;
    
    // test
    // return h === 22 && m >= 30 && m <= 59;
}

// 첫 타임 순위 발표 (AM 00:00 ~ AM 00:59)
export function checkIsAnounceTime(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    return h === 0 && m >= 0 && m <= 59;

    // test
    // return h === 19 && m >= 30 && m <= 59;
}