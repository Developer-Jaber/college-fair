"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { RegisterPayload, RegistrationResult } from "@/types";

export const registerUser = async (payload: RegisterPayload): Promise<RegistrationResult> => {
  try {
    const { name, email, password } = payload;

    // Validation
    if ( !name || !email || !password ) {
       throw new Error("All fields are required");
    }


    const userCollection = await dbConnect(collectionNames.USERS);

    // Check if user exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      throw new Error  ("User already exists");
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'USER'
    });

    if(!result.acknowledged){
      throw new Error('Faild to create user')
    }

    return {
      success: true,
      insertedId: result.insertedId.toString()
    };

  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Registration failed" 
    };
  }
};


