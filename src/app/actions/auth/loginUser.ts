"use server";
import bcrypt from 'bcrypt';

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { LoginPayload, User } from '@/types';



export const loginUser = async (payload: LoginPayload): Promise<User | null> => {
  try {
    const { email, password } = payload;

    const userCollection = await dbConnect(collectionNames.USERS);
    const user = await userCollection.findOne<User>({ email });
    
    if (!user) return null;
    
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) return null;
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};



