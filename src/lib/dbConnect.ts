import { MongoClient, ServerApiVersion } from  "mongodb";

export const collectionNames = {
  PRODUCTS: "products",
  ITEMS: "items",
  USERS: "users",
  ORDERS: "orders",
  REVIEWS: "reviews",
  CATEGORIES: "categories",
  CARTS: "carts",
}

function dbConnect (collectionName: string){
  //  const uri = process.env.MONGODB_URI
   const uri: string = process.env.MONGODB_URI ?? "";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

   return client.db(process.env.DB_NAME).collection(collectionName)
}


export default dbConnect;

