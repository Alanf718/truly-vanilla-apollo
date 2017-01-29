const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

const Person = require('./../person');
const Resource = require('./../resource');

const PositionType = new GraphQLObjectType({
    name: 'PositionType',

    fields: {
        id: { type: GraphQLInt },
        x: { type: GraphQLInt },
        y: { type: GraphQLInt },
        resources: { type: new GraphQLList(Resource.Type) },
        people: { type: new GraphQLList(Person.Type) }
    }
});

const PositionQuery = {
    type: new GraphQLList(PositionType),
    description: 'A position',
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
        return json('position').get(query);
    }
};

module.exports = {
    Type: PositionType,
    Query: PositionQuery
};
