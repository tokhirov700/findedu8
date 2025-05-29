
export interface Receptions{
  centerId: number
  createdAt: string
  filialId: number
  id: number
  majorId: number
  status: string
  updatedAt: string
  userId: number
  visitDate: string
  user?: User
}

export interface Region{
    id: number
    name: string
}

export interface User{
  createdAd: string
  email: string
  firstName: string
  id: number
  image: string
  isActive: boolean
  lastName: string
  phone: string
  role: string
  updatedAt: string
}

