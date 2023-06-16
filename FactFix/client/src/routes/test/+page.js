import { MongoClient } from "mongodb";

let uri='mongodb+srv://prasannapadhye10:Prasanna%4010@cluster0.wdnfghd.mongodb.net/test?retryWrites=true&w=majority';
// let uri = import.meta.env.MONGODB_URI;
// let uri = process.env.MONGODB_URI;
let dbName = 'pcb-01-2023';

const check=async  ()=>{
    try{
        let client = await MongoClient.connect(uri,{useNewUrlParser:true})
        let db = client.db(dbName);
        let applicationSchema = await db.collection('admins');
        let users = await applicationSchema.findOne({login:"admin"});
        console.log('users are.../',users)        
    }catch(e){
        console.log('error is..../',e)
    }
    return users
}


check()

