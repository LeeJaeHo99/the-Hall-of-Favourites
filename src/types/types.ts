// main
export interface ProfileProps{
    nameKo: string;
    nameEn: string;
    group: string;
    history: number;
}


// member
export interface MemberMainContentProps{
    [key: string]: string;
}

export interface MemberLeftContentProps{
    victory: number;
    likeHistory: number;
    todayLike: number;
    song: SongTitle;
    group: string;
}

export interface MemberDataType{
    _id: string;
    nameKo: [string, string];
    nameEn: string;
    group: [string, string, string];
    birth: string;
    age: string;
    company: string;
    debutDate: string;
    likeHistory: number;
    likeRecord: LikeRecord[];
    story: string[];
    todayLike: number[];
    weekLike: number[];
    song: Song;
    victory: number;
}

interface LikeRecord{
    date: string;
    user: string;
};

interface Song{
    id: string;
    title: string;
};


// board
export interface ContentTopProps{
    title: string;
    likeNum: number;
    commentNum: number;
    writer: string;
    date: string;
    id: string;
}

export interface ContentMidProps{
    content: string;
}

export interface ContentBotProps{
    [key: string]: string;
}

export interface BoardDeleteProps{
    style: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}


// admin
export interface AdminBtnProps{
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface AdminContentProps{
    clickIdx: number;
}

export interface PersonalInfo{
    content: number;
}


// ui
export interface PersonalImgProps{
    group: string;
    nameEn: string;
}

export interface ErrorMessageProps{
    text: string;
}

export interface MoreViewBtnProps{
    link: string;
}

export interface MusicThumbnailProps{
    song: SongTitle;
    group: string;
}

interface SongTitle{
    id: string;
    title: string;
}

