import   {graphql, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType,GraphQLSchema, GraphQLString } from "graphql";
import { ObjectId } from "mongodb";
// import _ from 'lodash'
import DB from '../db'

const BookType = new GraphQLObjectType({
    name : "Book", 
    fields : ()=>({
        _id: {type : GraphQLID},
        authorID : {type: GraphQLID},
        name : {type : GraphQLString},
        main : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
               // return _.find(authors,{id : parent.authorID})
             return  DB().then(DB => DB.collection("authors").findOne({"_id" : new ObjectId(parent.authorID)}))
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : "Author", 
    fields : ()=>({
        _id: {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : { 
            type : GraphQLList(BookType),
            resolve(parent,args){
              //  return _.filter(books,{authorID : parent.id})
              return DB().then(DB => DB.collection("books").find({authorID : parent._id.toString()})).then(async (data) => {return await  data.toArray()})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book :{
            type : BookType,
            args :{_id : {type : GraphQLID}},
            resolve(parent, args){
                // code to get data from db
               //return _.find(books,{id : args.id})
               return DB().then(DB => DB.collection("books").findOne({"_id" : new ObjectId(args._id)}))
            //    .then(async (data) => {return await  data.toArray()})
            }
        },
        author :{
            type : AuthorType,
            args : {_id : {type : GraphQLID}},
            resolve(parent, args){
               // return _.find(authors, {id : args.id})
            //    return DB().then(DB => DB.collection("authors").find({id : args.id})).then(async (data) => {return (await data.toArray())})
               return DB().then(DB => DB.collection("authors").findOne({"_id" : new ObjectId(args._id)}))
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
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull (GraphQLString)},
                age : {type : new GraphQLNonNull (GraphQLInt)},
            },
           resolve(parent,args){
                let author = {
                    name : args.name,
                    age : args.age
                }
              return  DB().then(DB => DB.collection("authors").insertOne(author)).then(async (data) => {if(data.acknowledged) return await (await DB()).collection("authors").findOne({name : author.name})})
            }
        },

        addBook : {
            type : BookType,
            args : {
                name : {type : new GraphQLNonNull (GraphQLString)},
                main : {type : new GraphQLNonNull (GraphQLString)},
                authorID : {type : new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent,args){
                let book = {
                    name : args.name,
                    main : args.main,
                    authorID : args.authorID
                }
                return DB().then(DB => DB.collection("books").insertOne(book)).then(async(data)=>{if(data.acknowledged) return await (await DB()).collection("books").findOne({name : book.name})})
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})


