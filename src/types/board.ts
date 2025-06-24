import { WriteType } from './data';

export interface BoardProps {
    category: boolean;
    recentWrite?: WriteType[];
    likeSortedWrite?: WriteType[];
    isSearch: boolean;
    searchList: WriteType[];
}

export interface BoardTrProps {
    list: WriteType;
}

export interface BoardBtnType {
    style: string;
    onClick?: () => void;
}

export interface BoardEditProp extends BoardBtnType{
    text: string;
}

export interface BoardDeleteProps extends Omit<BoardBtnType, 'onClick'> {
    onClick: () => void;
}

export interface BoardSearchProps {
    searchWord: string;
    onChangeSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsSearch: (v: boolean) => void;
}

export interface CategoryProps{
    category: boolean;
    clickLeft: () => void;
    clickRight: () => void;
    leftText: string;
    rightText: string;
}

export interface DeleteCommentModalProps {
    onClickDelete: (i: number | null) => void;
    param: string;
    index: number;
}

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