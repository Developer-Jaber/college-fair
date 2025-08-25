import { UserRole } from "./auth";

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
  name: string;
  image?: string;
  provider?: string;
  createdAt?: Date;
  lastLogin?: Date;
  role?:string;
  department?: string;
}

export interface CustomProfile {
  picture?: string;
  name?: string;
  email?:string;
  given_name?: string;
  family_name?: string;
}

export interface CustomUser {
  _id: string;
  email: string;
  name?: string;
  role: UserRole;
  department?: string;
}

export interface RegisterPayload {
  name: string,
  email: string;
  password: string;
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

// For a simple component prop
export interface StepProps {
  title: string;
  subtitle:string,
}

 export interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      avatar?: string
      role?: string
    }
  }

