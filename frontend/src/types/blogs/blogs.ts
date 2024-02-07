import { Interest } from "../interests/interests";
import { User } from "../users/users";

interface Likes {
    id: number;
    userId: number;
    blogId: number;
}

export interface Blog {
    id: number;
    title: string;
    description: string;
    tags: Interest[];
    likes: Likes[];
    user: User;
    createdAt: Date;
    imageUrl: string;
}

export interface BlogPostData {
    title: string;
    description: string;
    tags: number[];
    //imageUrl: string;
    image?: File;
    userId: number;
}