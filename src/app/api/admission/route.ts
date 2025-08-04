import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNames } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function GET() {

    const session = await getServerSession(authOptions)
    const data = await  dbConnect(collectionNames.ADMISSION).find({ email: session?.user?.email }).toArray()
 
  return Response.json(data)
}

export async function POST(req: Request) {
    const postedData =  await req.json()
    const result = await dbConnect(collectionNames.ADMISSION).insertOne(postedData)
    revalidatePath("/admission")
    return Response.json(result)
}


export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if(!session?.user?.email || !id) {
      return NextResponse.json(
        {error: "Unauthorized"},
        { status: 401 }
      )
    }

    // validate the id formate
    if(!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalide application ID" },
        { status: 400 }
      )
    }

    const result =  await dbConnect(collectionNames.ADMISSION).
    deleteOne({
      _id: new ObjectId(id),
      email: session.user.email
    })

    if(result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Application not found or not authorized " },
        { status: 404 }
      )
    }

    revalidatePath("/admission")
    return NextResponse.json({ success: true})
  } catch (error: unknown) {
    const errorMassege = error instanceof Error ? error.message : 'Faild to delete admission'

    console.log('Delete admission error:' , errorMassege)
    
    return NextResponse.json(
      { error: errorMassege },
      {status: 500 }
    )
  }

}