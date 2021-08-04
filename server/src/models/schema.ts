import   {graphql, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType,GraphQLSchema, GraphQLString } from "graphql";
import _ from 'lodash'


// dummy data and I am a big fan of PERCY JAKSON
let books = [
    {name : "Percy Jakson", genre : "fantasy", id : "1", authorID : '1'},
    {name : "Robert Langdon", genre : "fantasy", id : "2", authorID : '2'},
    {name : "Kevin Aaaquil", genre : "fantasy", id : "3", authorID : '3'},
    {name : "ShadowHunters", genre : "fantasy", id : "4", authorID : '4'},
    {name : "Celaena Sardothien", genre : "fantasy", id : "5", authorID : '5'},
    {name : "The Heroes Of Olympus", genre :"fantasy", id:6, authorID : '1'},
    {name : "The Kane Chronicles", genre : "fantasy", id:7, authorID : '1'},
    {name : "The Trials Of Apollo", genre :"fantasy", id:8, authorID : '1'},
]

let authors = [
    {name : "Rick Riordan", age:57, id:"1"},
    {name : "Dan Brown", age:57, id : "2" },
    {name : "Eshan Singh", age:18, id : "3"},
    {name : "Cassandra Claire", age : 48, id:"4"},
    {name: "Sarah J. Maas", age : 35, id:"5"}
]


const BookType = new GraphQLObjectType({
    name : "Book", 
    fields : ()=>({
        id: {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
                return _.find(authors,{id : parent.authorID})
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
                return _.filter(books,{authorID : parent.id})
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
               return _.find(books,{id : args.id})
            }
        },
        author :{
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id : args.id})
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery
})


