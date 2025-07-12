import { MongoClient, ServerApiVersion } from  "mongodb";

function dbConnect (collectionName: string){
   const uri = process.env.MONGODB_URI
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


// // lib/dbConnect.ts
// import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// const dbName = process.env.DB_NAME!;

// if (!uri || !dbName) {
//   throw new Error("❌ MONGODB_URI or DB_NAME not defined in .env.local");
// }

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// export default async function dbConnect<T = any>(collectionName: string): Promise<Collection<T>> {
//   if (!cachedClient || !cachedDb) {
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });

//     await client.connect(); // ✅ Always connect first
//     cachedClient = client;
//     cachedDb = client.db(dbName);
//   }

//   return cachedDb.collection<T>(collectionName);
// }
