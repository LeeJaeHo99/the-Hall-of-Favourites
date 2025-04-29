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


// COMPONENT
export interface BoardPropsType{
    category: boolean;
    recentWrite?: WriteType[];
    likeSortedWrite?: WriteType[];
    isSearch: boolean
    searchList: WriteType[];
}

export interface BoardTrPropsType {
    list: WriteType;
}

export interface BoardEditPropsType{
    [key: string]: string;
}

export interface BoardSearchPropsType{
    searchWord: string;
    onChangeSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsSearch: (v: boolean) => void;
}

export interface WriteType{
    _id: string;
    title: string;
    writer: string;
    pw: string;
    content: string;
    comment: CommentType[];
    date: string;
    likeNum: number;
    record?: RecordType[];
}

export interface CommentType{
    name: string;
    text: string;
    pw: string;
}

interface RecordType{
    ip: string;
    date: string;
}

// Board
export interface ContentTopProps{
    id: string;
    title: string;
    likeNum: number;
    commentNum: number;
    writer: string;
    date: string;
}
export interface BoardDeleteProps{
    style: string;
    onClick: () => void;
} 

export interface DeleteCommentModalPropstype{
    setIsClickDelete: () => null;
    param: number;
    index: number;
}

export interface PaginationPropsType{
    data?: WriteType[];
    pagination: number;
    setPagination: () => void;
}