import { MemberDataType } from "@/types/types";

export function getRecentTime(todayLikeLength: number) {
    const count = Math.min(todayLikeLength, 5);
    const now = new Date();
    now.setMinutes(0, 0, 0);

    return Array.from({ length: count }, (_, i) => {
        const d = new Date(now.getTime() - (count - 1 - i) * 60 * 60 * 1000);
        return `${d.getHours().toString().padStart(2, "0")}:00`;
    });
}

export function convertTop5Data(idols: MemberDataType[]) {
    if (!idols || idols.length === 0) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const maxLength = Math.min(currentHour + 1, 5);

    const startIdx = Math.max(0, currentHour - maxLength + 1);
    const endIdx = currentHour + 1;

    const times = [];
    for (let i = startIdx; i < endIdx; i++) {
        times.push(`${i.toString().padStart(2, "0")}:00`);
    }

    return times.map((time, i) => {
        const entry: { [key: string]: number | string } = { time };
        idols.forEach((idol) => {
            const todayLike = idol.todayLike || [];
            entry[idol.nameKo[0]] = todayLike[startIdx + i] ?? 0;
        });
        return entry;
    });
}

export function getTop5LatestLike(idols: MemberDataType[]) {
    const currentHour = new Date().getHours();
    const maxCount = 5;

    return [...idols]
        .sort((a, b) => {
            const startIndex = Math.max(0, currentHour - (maxCount - 1));
            const endIndex = currentHour + 1;

            const aLikes = (a.todayLike || [])
                .slice(startIndex, endIndex)
                .reduce((sum, val) => sum + val, 0);

            const bLikes = (b.todayLike || [])
                .slice(startIndex, endIndex)
                .reduce((sum, val) => sum + val, 0);

            return bLikes - aLikes;
        })
        .slice(0, 5);
}
