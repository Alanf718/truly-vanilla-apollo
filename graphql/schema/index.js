const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList} = require('graphql');

const Person = require('./queries/person');
const Resource = require('./queries/resource');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        resource: Resource.Query
    }
});

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',

    fields: () => ({
        addPerson: Person.Mutation
    })
});


const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = ncSchema;
