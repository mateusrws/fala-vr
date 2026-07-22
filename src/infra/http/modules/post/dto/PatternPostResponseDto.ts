

export interface PatternPostResponseDto{
    id:string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    uppoints: number;
    downpoints: number;
    father_post_id: string;
}