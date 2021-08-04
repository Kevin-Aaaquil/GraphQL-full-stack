import { MongoClient, Db } from "mongodb";
import config from './config'
let db : Db;

async function connect() : Promise<Db> {
    const client = await MongoClient.connect(config.MONGO_URI,{
        ignoreUndefined: true
    })
    console.log("✅ : database connected")
    return client.db(config.DB_NAME)
}

async function DB() : Promise<Db> {
    if(!db){
        db = await connect()
        return db;
    }
    return db;
}

export default DB