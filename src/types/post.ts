import { User } from '.';

export type Post = {
  id: string;
  video_url: string;
  description: string;
  user: User;
  nrOfLikes: { count: number }[];
  nrOfComments: { count: number }[];
};

export type PostInput = {
  video_url: string;
  description: string;
  user_id: string;
};
