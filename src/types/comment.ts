export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  comment: string;
  created_at: string;
};

export type NewCommentInput = {
  post_id: string;
  user_id: string;
  comment: string;
};
