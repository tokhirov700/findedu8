import http from '@/config';
import { create } from 'zustand';
import type { AxiosResponse } from 'axios';

interface CommentData {
  centerId: number;
  text: string;
  star: number;
}

interface patchCommit{
  text: string
  star: number
}

interface Comment {
  postComment: (data: CommentData) => Promise<AxiosResponse<any>>;
  deleteComment: (id: number) => Promise<AxiosResponse<any>>
  editComment: (id:number, data: patchCommit) => Promise<AxiosResponse<any>>
}

export const isComment = create<Comment>(() => ({
  postComment: async (data) => {
    return await http.post('/comments', data);
  },
  deleteComment: async (id) => {
    return await http.delete(`/comments/${id}`);
  },
  editComment: async (id, data) => {
    return await http.patch(`/comments/${id}`, data)
  }
}));
