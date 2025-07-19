import dbConnect, { collectionNames } from "@/lib/dbConnect"
import { revalidatePath } from "next/cache"


export async function GET() {
  
    const data = await  dbConnect(collectionNames.ADMISSION).find({}).toArray()
 
  return Response.json(data)
}

export async function POST(req: Request) {
    const postedData =  await req.json()
    const result = await dbConnect(collectionNames.ADMISSION).insertOne(postedData)
    revalidatePath("/admission")
    return Response.json(result)
}