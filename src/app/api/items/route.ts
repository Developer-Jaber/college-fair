import dbConnect from "@/lib/dbConnect"


export async function GET() {
  
    const data = await  dbConnect("comments").find({}).toArray()
 
  return Response.json(data)
}

export async function POST(req: Request) {
    const postedData =  await req.json()
   const result = await dbConnect("comments").insertOne(postedData)
    return Response.json(result)
}