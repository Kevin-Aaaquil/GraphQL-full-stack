import  graphql, { GraphQLObjectType,GraphQLSchema, GraphQLString } from "graphql";

const BookType = new GraphQLObjectType({
    name : "Book", 
    fields : ()=>({
        id: {type : GraphQLString},
        name : {type : GraphQLString},
        genre : {type : GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book :{
            type : BookType,
            args :{id : {type : GraphQLString}},
            resolve(parent, args){
                // code to get data from db
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery
})


// dummy data and I am a big fan of PERCY JAKSON
let books : Book[] = [
    {name : "The lightning thief", genre : "fantasy", id : 1},
    {name : "The sea of monsters", genre : "fantasy", id : 2},
    {name : "The titan's curse", genre : "fantasy", id : 3},
    {name : "The battle of the labyrinth", genre : "fantasy", id : 4},
    {name : "The last olympian", genre : "fantasy", id : 5},
]

type Book = {
    name : String;
    genre : String;
    id : number;
}