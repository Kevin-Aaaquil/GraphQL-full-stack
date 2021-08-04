import express from 'express'
const app = express();
import config from './config';
import  {graphqlHTTP}  from 'express-graphql';
import schema from './models/schema'
import cors from 'cors'

//to be removed
import DB from './db'
DB().catch(err => console.log(err))
// to be removed

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/graphql',graphqlHTTP({
schema : schema,
graphiql : true,
}))

app.get('/',(req,res)=>{
    res.send("connected")
})


app.get('/view',async(req,res)=>{
    try {
        if(req.query.request === "authors"){
            await (await DB()).collection("authors").find({}).toArray().then(data => res.json(data)).catch(err => {throw {err}})
        }
        else if(req.query.request === "books"){
            await (await DB()).collection("books").find({}).toArray().then(data => res.json(data)).catch(err => {throw {err}})
        }
        else
        {
            res.send("Enter request")
        }
    } catch (error) {
        res.send(error)
    }
})


const port :number = parseInt(<string>config.PORT, 10) || 3000;
const host = "0.0.0.0"
app.listen(port,host,()=>{
    console.log(`✅ : listening on port ${port}`)
})