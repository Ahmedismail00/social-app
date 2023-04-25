export interface IPost {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
  liked?: boolean;
}