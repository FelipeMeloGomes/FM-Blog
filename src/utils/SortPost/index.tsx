import { Post } from "./types";

const SortPost = (posts: Post[]): Post[] | undefined => {
    return posts && [...posts].sort((a, b) => a.title.localeCompare(b.title));
};

export { SortPost };
