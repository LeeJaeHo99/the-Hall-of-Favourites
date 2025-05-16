// FETCH DATA TYPE
export interface FetchDataType {
    [key: string]: string;
}

// STORE
export interface PaginationStore {
    pagination: number;
    setPagination: (page: number) => void;
}

export interface IsSaturdayStore {
    isSaturday: boolean;
    setIsSaturday: () => void;
}

export interface IsSundayStore {
    isSunday: boolean;
    setIsSunday: () => void;
}

// Data
export interface WriteDataType {
    _id: string;
    title: string;
    writer: string;
    pw: string;
    content: string;
    comment: CommentType[];
    date: string;
    likeNum: number;
    record?: {
        ip: string;
        date: string;
    }[];
}

export interface CommentType {
    comment: {
        name: string;
        text: string;
        pw: string;
    }
}

export interface CommentItem {
    name: string;
    text: string;
    pw: string;
}

export interface MemberDataType {
    _id: string;
    age: string;
    birth: string;
    company: string;
    debutDate: string;
    group: string[];
    likeHistory: number;
    likeRecord: {
        date: string;
        user: string;
    }[];
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
    [key: string]: string;
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
}
export interface BoardDeleteProps {
    style: string;
    onClick: () => void;
}

export interface DeleteCommentModalPropstype {
    onClickDelete: (i: number | null) => void;
    param: number;
    index: number;
}

export interface PaginationPropsType {
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

export interface WinnerRightPropsType {
    [key: string]: number;
}

export interface PersonImgPropsType{
    group: string;
    nameEn: string;
    trigger: boolean;
}

export interface ProfileHistoryPropsType{
    nameKo: string;
    group: string;
    nameEn: string;
    history: number;
}

export interface MemberMainContentPropsType{
    group: string;
    trigger:  boolean;
    desc:  string;
    title:  string;
    nameEn:  string;
}

export interface MemberType {
    nameKo: string[];
    nameEn: string;
    group: string[];
    birth: string;
    age: string;
    debutDate: string;
    company: string;
    likeHistory: number;
    weekLike: number[];
    todayLike: number[];
    likeRecord: { date: string; user: string }[];
    victory: number;
    song: {
        id: string;
        title: string;
    };
    story?: string[];
    cheerMsg: string[];
}

export interface WriteType {
    _id: string;
    title: string;
    date: string;
    comment: CommentType[];
}

export interface CheerMessagePropsType {
    cheerMessage: string[];
}

export interface MusicThumbnailPropsType {
    song: {
        id: string;
        title: string;
    };
    group: string;
}

export interface RadioBtnProps {
    id: string;
    name: string;
    checked: boolean;
    onClick: () => void;
}

export interface TitlePropsType {
    title: string;
    desc?: string;
    moreView?: boolean;
    children?: React.ReactNode;
}

export interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}