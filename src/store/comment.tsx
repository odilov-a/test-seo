import { storage } from 'services';
import { StateCreator } from 'zustand';

export interface IComment {
  comments: any
  addComment: (action: { [key: string]: any }) => void;
  updateCommentReactions: any;
}

export const commentSlice: StateCreator<IComment, [], []> = ((set):IComment => ({
  comments: JSON.parse(storage.get("comments") || "[]"),

  addComment: (newComment: any) => set((state: any) => ({ comments: [...state.comments, newComment] })),

  updateCommentReactions: (commentId:any, likes:any, dislikes:any) =>
    set((state) => {
      const updatedComments = state.comments.map((comment:any) => {
        if (comment._id === commentId) {
          if (comment.likes > 0 && dislikes > 0) {
            return { ...comment, likes: comment.likes - 1, dislikes };
          }
        }
        return comment;
      });
      storage.set("comments", JSON.stringify([...state.comments]))
      return { comments: updatedComments };
    }),
}));