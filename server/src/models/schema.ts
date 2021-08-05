import   {graphql, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType,GraphQLSchema, GraphQLString } from "graphql";
// import _ from 'lodash'
import DB from '../db'

const BookType = new GraphQLObjectType({
    name : "Book", 
    fields : ()=>({
        id: {type : GraphQLID},
        name : {type : GraphQLString},
        main : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
               // return _.find(authors,{id : parent.authorID})
             return  DB().then(DB => DB.collection("authors").find({id : parent.authorID})).then(async (data)  =>{ return await data.toArray()})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : "Author", 
    fields : ()=>({
        id: {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : { 
            type : GraphQLList(BookType),
            resolve(parent,args){
              //  return _.filter(books,{authorID : parent.id})
              return DB().then(DB => DB.collection("books").find({authorID : parent.id})).then(async (data) => {return await  data.toArray()})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book :{
            type : BookType,
            args :{id : {type : GraphQLID}},
            resolve(parent, args){
                // code to get data from db
               //return _.find(books,{id : args.id})
               return DB().then(DB => DB.collection("books").findOne({id : args.id}))
            //    .then(async (data) => {return await  data.toArray()})
            }
        },
        author :{
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent, args){
               // return _.find(authors, {id : args.id})
               return DB().then(DB => DB.collection("authors").findOne({id : args.id}))
            //    .then(async (data) => {return await  data.toArray()})
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
              //  return books
              return DB().then(DB => DB.collection("books").find({})).then(async (data) => {return await data.toArray()})
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors
               return DB().then(DB => DB.collection("authors").find({})).then(async (data) => {return await data.toArray()})
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery
})


