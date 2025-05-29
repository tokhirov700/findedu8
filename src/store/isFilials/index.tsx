import http from '@/config';
import type { Receptions } from '@/types/global';
import { create } from 'zustand';

interface dataFilialsRegion{
    id: string
    name: string
}




interface dataFilialsCenter{
  address: string
  createdAt: string
  id: number
  image: string
  name: string
  phone: string
  regionId: number
  seoId: number
  updatedAt: string
}



interface dataFilials{
  address: string
  createdAt: string
  centerId: number
  id: number
  center: dataFilialsCenter
  name:string
  phone: string
  region: dataFilialsRegion
  regionId: number
  updatedAt:string
  receptions: [Receptions]
  image: string
}

export interface isFilials{
    isFilialData: dataFilials | undefined,
    getFilialsById: (id:number) => Promise<void>
}

export const isFilials = create<isFilials>((set) => ({
  isFilialData: undefined,
  getFilialsById: async (id) => {
    try {
      const response = await http.get(`/filials/${id}`);
      set({ isFilialData: response.data.data });
    } catch (error) {
      console.error('Filiallarni olishda xatolik:', error);
    }
  }
}));