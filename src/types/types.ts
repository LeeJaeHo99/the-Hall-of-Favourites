// Data
export interface Record {
    ip: string;
    date: string;
}

export interface Comment {
    name: string;
    text: string;
    pw: string;
}

export interface WriteDataType {
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



export interface LikeRecord {
    date: string;
    user: string;
}

export interface MemberDataType {
    _id: string;
    age: string;
    birth: string;
    company: string;
    debutDate: string;
    group: string[];
    likeHistory: number;
    likeRecord: LikeRecord[];
    nameEn: string;
    nameKo: [string, string];
    song: {
        id: string;
        title: string;
    };
    todayLike: number[];
    victory: number;
    weekLike: number[];
    story?: string[];
    cheerMsg?: string[];
    beforeLike: number;
}

export interface Top5Data{
    name: string;
    sum: number;
}

// Board
export interface BoardPropsType {
    category: boolean;
    recentWrite?: WriteDataType[];
    likeSortedWrite?: WriteDataType[];
    isSearch: boolean;
    searchList: WriteDataType[];
}

export interface BoardTrPropsType {
    list: WriteDataType;
}

export interface BoardEditPropsType {
    style: string;
    text: string;
    onClick?: () => void;
}

export interface BoardSearchPropsType {
    searchWord: string;
    onChangeSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsSearch: (v: boolean) => void;
}


export interface CategoryPropsType{
    category: boolean;
    clickLeft: () => void;
    clickRight: () => void;
    leftText: string;
    rightText: string;
}

// WRITE
export interface ContentTopProps {
    id: string;
    title: string;
    likeNum: number;
    commentNum: number;
    writer: string;
    date: string;
    likeNumState: number;
    setLikeNumState: (likeNum: number) => void;
    commentNumState: number;
    setCommentNumState: (commentNum: number) => void;
    pw: string;
}

export interface PaginationProps {
    data: WriteDataType[];
    pagination: number;
    setPagination: (value: number) => void;
}


// WINNER
export interface WinnerLeftPropsType {
    cheerMessage?: string[];
    song: {
        id: string;
        title: string;
    };
    group: string;
    nameKo: string;
}

export interface WinnerMainPropsType {
    targetRef: {
        current: null;
    }
    isSunday: boolean;
    groupL: string;
    groupU: string;
    nameKo: string;
    nameEn: string;
}

export interface WriteType {
    _id: string;
    title: string;
    date: string;
    comment: Comment[];
}