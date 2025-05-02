import { MemberDataType } from "@/types/types";

export function getTodayLikeSums(todayLike: number[]) {
    const now = new Date();
    const currentHour = now.getHours();

    const cumulative = [];
    let sum = 0;
    for (let i = 0; i <= currentHour; i++) {
        sum += todayLike[i];
        cumulative.push(sum);
    }

    return cumulative.slice(-5);
}

export function getTop5(members: MemberDataType[]) {
    const now = new Date();
    const currentHour = now.getHours();

    const memberSums = members.map((member) => {
        const arr = member.todayLike || [];
        const sum = arr.slice(0, currentHour + 1).reduce((a, b) => a + b, 0);

        return {
            name: member.nameKo[0],
            sum,
        };
    });

    const top5 = memberSums.sort((a, b) => b.sum - a.sum).slice(0, 5);

    return top5;
}

export function transformChartData(data: { name: string; data: number[] }[]) {
    if (data.length === 0) return [];

    const length = data[0].data.length;
    const now = new Date();
    const currentHour = now.getHours();

    return Array.from({ length }).map((_, i) => {
        const hour = currentHour - length + 1 + i;
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;

        const entry: any = { time: timeStr };

        data.forEach((member) => {
            entry[member.name] = member.data[i];
        });

        return entry;
    });
}

