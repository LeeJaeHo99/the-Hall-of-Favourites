// main
export interface ProfileProps{
    nameKo: string;
    nameEn: string;
    group: string;
    history: number;
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