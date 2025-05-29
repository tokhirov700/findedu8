import http from '@/config';
import type { User } from '@/types/global';
import { create } from 'zustand';


interface myUser extends User{
   comments: {
    centerId: number
    createdAt: string
    id: number
    star: number
    text: string
    updatedAt: string
    userId: number
  }[]
  likes: {
    centerId:number
    createdAt: string
    id: number
    updatedAt: string
    userId: number
  }[]
  password: string
  receptions: {
    centerId: number
    createdAt: string
    filialId: number
    id:number
    majorId: number
    status:string
    updatedAt: string
    userId: number
    visitDate: string
    center: {
      address:string
      createdAt: string
      id: number
      image: string
      name:string
      phone: string
      regionId: number
      seoId: number
      updatedAt: string
    }
    filial:{
      address: string
      centerId: number
      createdAt: string
      id: number
      image: string
      name: string
      phone: string
      regionId: number
      updatedAt: string
    }
    major: {
      fieldId: number
      id: number
      image: string
      name: string
      subjectId: number | null
    }
  }[]
  resources?: unknown
}

interface isUser{
  MyUser?: myUser
  getMyUser: () => void
}


export const isUser = create<isUser>((set) => ({
    MyUser: undefined,
    getMyUser: async () => {
       try{
          const response = await http.get('/users/mydata')
          set({ MyUser: response.data.data });
       }catch(err){
        console.log(err)
       }
    } 
}));