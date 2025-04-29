import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
if (!url) throw new Error("MONGODB_URL 환경 변수가 없습니다.");

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url).connect();
}

export { connectDB };
