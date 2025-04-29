import { MemberDataType } from '@/types/types';

export function getRecentTime(todayLikeLength: number) {
    const count = Math.min(todayLikeLength, 5);
    const now = new Date();
    now.setMinutes(0, 0, 0);
    
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(now.getTime() - (count - 1 - i) * 60 * 60 * 1000);
        return `${d.getHours().toString().padStart(2, "0")}:00`;
    });
}

export function convertTop5Data(idols: MemberDataType) {
    if (!idols || idols.length === 0) return [];
    
    const maxLength = Math.min(
        Math.max(...idols.map(idol => idol.todayLike?.length || 0)),
        5
    );

    const times = getRecentTime(maxLength);

    return times.map((time, i) => {
        const entry = { time };
        idols.forEach((idol) => {
            const likeLength = idol.todayLike?.length || 0;
            const start = Math.max(0, likeLength - maxLength);
            const slicedHistory = (idol.todayLike || []).slice(start);
            
            const paddedHistory = [
                ...Array(maxLength - slicedHistory.length).fill(0),
                ...slicedHistory
            ];

            entry[idol.nameKo[0]] = paddedHistory[i] || 0;
        });
        return entry;
    });
}


export function getTop5LatestLike(idols: MemberDataType) {
    return [...idols]
        .sort((a, b) => {
            const aMem = a.todayLike[a.todayLike.length - 1];
            const bMem = b.todayLike[b.todayLike.length - 1];
            return bMem - aMem;
        })
        .slice(0, 5);
}
