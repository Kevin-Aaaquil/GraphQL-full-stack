import express from 'express'
const app = express();
import config from './config';
import  {graphqlHTTP}  from 'express-graphql';
import schema from './models/schema'

app.use('/graphql',graphqlHTTP({
schema : schema
}))


const port = config.PORT || 3000
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})