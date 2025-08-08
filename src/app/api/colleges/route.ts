import dbConnect, { collectionNames } from "@/lib/dbConnect"
import { revalidatePath } from "next/cache"


export async function GET() {
  
    const data = await  dbConnect(collectionNames.COLLEGES).find({}).toArray()
 
  return Response.json(data)
}

export async function POST(req: Request) {
    const postedData =  await req.json()
    const result = await dbConnect(collectionNames.COLLEGES).insertOne(postedData)
    revalidatePath("/colleges")
    return Response.json(result)
}