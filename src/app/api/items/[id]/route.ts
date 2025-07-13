// app/api/items/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const item = await dbConnect(collectionNames.PRODUCTS).findOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json(item);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const result = await dbConnect(collectionNames.PRODUCTS).deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json(result);
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const data = await req.json();

  const result = await dbConnect(collectionNames.PRODUCTS).updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
    { upsert: true }
  );

  return NextResponse.json(result);
}
