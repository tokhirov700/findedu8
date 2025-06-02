import http from '@/config';
import type { AxiosResponse } from 'axios';
import { create } from 'zustand';

interface payload{
    centerId: number
    majorId: number
    filialId: number
    visitDate: string
}

interface Reseption{
    postReseption: (payload: payload) => Promise<AxiosResponse<any>>
}

export const isReseption = create<Reseption>(() => ({
    postReseption: async (payload) => {
        return await http.post('/reseption', payload)
    }
}));
