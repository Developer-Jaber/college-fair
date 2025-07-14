"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";


export const registerUser = async (payload) => {
    const userCollection = await dbConnect(collectionNames.USERS);

    // validating
    const {email, password, confirmPassword} = payload;
    if(!email || !password || !confirmPassword) return { success: false};

    if(password !== confirmPassword) return { success: false};

    const user = await userCollection.findOne({ email: payload.email});

    if(!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;
        payload.confirmPassword = hashedPassword;
        const result = await userCollection.insertOne(payload);
        const {acknowledged, insertedId } = result;
        return {acknowledged, insertedId};
    }

    return { success: false};
}