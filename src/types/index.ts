
export type Product = {
  _id: string;
  name: string;
  price: number;
};


export interface LoginPayload {
  email: string;
  password: string;
}


export interface User {
  _id: string;
  email: string;
  password: string;
  name: string
  image?: string
  provider?: string
  createdAt?: Date
  lastLogin?: Date
}

export interface CustomProfile {
  picture?: string;
  name?: string;
  email?:string;
  given_name?: string;
  family_name?: string;
}


export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResult {
  success: boolean;
  acknowledged?: boolean;
  insertedId?: string;
  error?: string;
}

export interface AdmissionData {
  college: {
    id: number
    name: string
    logo: string
  }
  name: string
  email: string
  phone: string
  address: string
  dob: string
  subject: string
  image: string
  status: string
  appliedAt: string
}

export interface AdmissionState {
  userAdmissions: AdmissionData[]
  loading: boolean
  error: string | null
}



export interface College {
  id: number
  name: string
  image: string
  rating: number
  reviews: number
  admission: string
  research: number
  events: string[]
  sports: string[]
}

