import http from '@/config';
import { create } from 'zustand';
import type { Receptions, Region, User } from '@/types/global';

export interface CenterComments{
  centerId: number
  createdAt: string
  id: number
  star: number
  text: string
  updatedAt: string
  user: User
  userId: number
}

interface Likes {
  centerId: number
  createdAt: string
  id: number
  updatedAt: string
  userId: number
}

interface MajorItems{
  centerId: number
  createdAt: string
  id: number
  majorId: number
  updatedAt: string
}

interface Majors{
  fieldId: number
  id: number
  image: string
  name: string
  subjectId: number | null
  majoritems: MajorItems

}

interface Filials{
  address: string
  createdAt: string
  centerId: number
  id: number
  name:string
  phone: string
  region: {
    id: number
    name: string
  }
  regionId: number
  updatedAt:string
}

export interface CenterData{
  address: string
  comments: CenterComments[]
  createdAt: string
  filials: Filials[]
  id: number
  image: string
  likes: Likes[]
  majors: Majors[]
  name: string
  phone: string
  receptions: Receptions[]
  region: Region
  regionId: number
  seoId: number
  updatedAt: string
  user: User
}


interface inCenters{
  isCenterData: CenterData[]
  getCenters: () => void
  getCenterById: (id:number) => Promise<CenterData>
}

export const isCenters = create<inCenters>((set) => ({
  isCenterData: [],
  getCenters: async () => {
    try {
      const response = await http.get(`/centers`);
      if (response?.data?.data?.length) {
        set({ isCenterData: response.data.data });
      }
    } catch (error) {
      console.error('Centerlarni olishda xatolik:', error);
    }
  },
  getCenterById: async (id) => {
    try{
      const response = await http.get('/centers/' + id)
      return response.data.data 
    }catch(err){
      console.log(err)
    }
  }
}));