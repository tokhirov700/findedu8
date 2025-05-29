import http from '@/config';
import { create } from 'zustand';

export interface majordata{
    centers: any[]
    field: any[]
    fieldId: number
    id:number
    image: string
    name:string
    subject: any | null
    subjectId: any | null
}

interface ismajor{
    dataMajors: majordata[]
    getMajors: () => void
}

export const isMajors = create<ismajor>((set) => ({
    dataMajors: [],
    getMajors: async () => {
       try{
         const response = await http.get('/major')
         set({dataMajors: response.data.data})
       }catch(err){
        console.log(err)
       }

    }
}));