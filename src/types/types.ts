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
    onClickTrigger: () => void;
    onHandleLike: () => void;
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
    trigger?: boolean;
}

interface LikeRecord{
    date: string;
    user: string;
};

interface Song{
    id: string;
    title: string;
};

export interface LikeComponentProps{
    onClickTrigger: () => void;
    onHandleLike: () => void;
}


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
    trigger?: boolean;
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






export interface WriteType{
    comment?: CommentType[];
    content?: string;
    date: string;
    likeNum: string;
    pw?: string;
    record?: RecordType[];
    title: string;
    writer?: string;
    _id: string;
}

interface CommentType {
    name: string;
    pw: string;
    text: string;
}

interface RecordType {
    ip: string;
    date: string;
}

// FETCH DATA TYPE
export interface PostWriteType{
    [key: string]: string;
}

export interface PostCommentType{
    [key: string]: string;
}

export interface PostLikePostType{
    [key: string]: string;
}

export interface PatchEditWriteType{
    [key: string]: string;
}