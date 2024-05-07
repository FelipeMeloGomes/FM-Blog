export interface Post {
    body?: string;
    createdAt?: {
        seconds: number;
        nanoseconds: number;
    };
    createdBy?: string;
    id?: string | number;
    image?: string;
    tagsArray?: string[];
    title?: string;
    uid?: string;
    post?: Post;
}
