"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { RegisterPayload, RegistrationResult } from "@/types";

export const registerUser = async (payload: RegisterPayload): Promise<RegistrationResult> => {
  try {
    const { email, password, confirmPassword } = payload;
    const userCollection = await dbConnect(collectionNames.USERS);

    // Validation
    if (!email || !password || !confirmPassword) {
      return { success: false, error: "All fields are required" };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    // Check if user exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userCollection.insertOne({
      ...payload,
      password: hashedPassword,
      confirmPassword: undefined // Remove confirmPassword from stored document
    });

    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString()
    };

  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: "Registration failed. Please try again." 
    };
  }
};












// export const registerUser = async (payload) => {
//     const userCollection = await dbConnect(collectionNames.USERS);

//     // validating
//     const {email, password, confirmPassword} = payload;
//     if(!email || !password || !confirmPassword) return { success: false};

//     if(password !== confirmPassword) return { success: false};

//     const user = await userCollection.findOne({ email: payload.email});

//     if(!user) {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         payload.password = hashedPassword;
//         payload.confirmPassword = hashedPassword;
//         const result = await userCollection.insertOne(payload);
//         const {acknowledged, insertedId } = result;
//         return {acknowledged, insertedId};
//     }

//     return { success: false};
// }