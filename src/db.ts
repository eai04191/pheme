import { MongoClient, Collection, ObjectId } from "mongodb";

export type Record = {
  _id?: ObjectId;
  userId: number;
  join: Date;
  left?: Date;
};

export const connect = async () => {
  const client = await MongoClient.connect("mongodb://mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000,
  });

  await client.db("admin").command({ ping: 1 });
  console.log("db connected");

  //   const db = client.db("pheme");
  //   collections.records = db.collection<Record>("records");
};
