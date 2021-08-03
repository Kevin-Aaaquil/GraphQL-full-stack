"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const BookType = new graphql_1.GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                // code to get data from db
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
// dummy data and I am a big fan of PERCY JAKSON
let books = [
    { name: "The lightning thief", genre: "fantasy", id: 1 },
    { name: "The sea of monsters", genre: "fantasy", id: 2 },
    { name: "The titan's curse", genre: "fantasy", id: 3 },
    { name: "The battle of the labyrinth", genre: "fantasy", id: 4 },
    { name: "The last olympian", genre: "fantasy", id: 5 },
];
//# sourceMappingURL=schema.js.map