// Write
export interface WriteType {
    _id: string;
    title: string;
    writer: string;
    pw: string;
    content: string;
    comment: Comment[];
    date: string;
    likeNum: number;
    record: Record[];
}

export interface Record {
    ip: string;
    date: string;
}

export interface Comment {
    name: string;
    text: string;
    pw: string;
}
