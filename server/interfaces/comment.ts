export interface IComment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
  liked?: boolean;
}