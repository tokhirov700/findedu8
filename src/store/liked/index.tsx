import http from '@/config';
import { create } from 'zustand';


export const Likes = create<any>((set) => ({
  LikesData: [],
  getLikes: async () => {
        const response = await http.get('/liked')
        set({LikesData: response.data.data})
  }
}));