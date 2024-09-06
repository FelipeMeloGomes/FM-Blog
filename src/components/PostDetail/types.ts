export interface Post {
  id: string;
  title: string;
  image: string;
  createdBy: string;
  tagsArray: string[];
}

export interface PostDetailProps {
  post: Post;
}
