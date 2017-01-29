const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

const ResourceType = new GraphQLObjectType({
    name: 'ResourceType',

    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    }
});

const ResourceQuery = {
    type: new GraphQLList(ResourceType),
    description: 'A resource consumed by the people',
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve: (obj, args, { json }) => {
        let query = {};
        if(args.name) {
            query = {name: args.name};
        }
        return json('resources').get(query);
    }
};

module.exports = {
    Type: ResourceType,
    Query: ResourceQuery
};
