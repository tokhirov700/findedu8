import http from '@/config';
import { create } from 'zustand';

export interface region{
    name: string
    id: number
    centers: any[]
}


interface isregion{
    dataRegion: region[]
    getRegions: () => void
}


export const isRegion = create<isregion>((set) => ({
  dataRegion: [],
  getRegions: async () => {
    try{
        const response = await http.get("/regions/search")
        set({dataRegion: response.data.data})
    }catch(err){
        console.log(err)
    }
  }
}));