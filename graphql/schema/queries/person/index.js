const {GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');
const uuid = require('uuid/v1');
const random_name = require('node-random-name');

const PersonType = new GraphQLObjectType({
    name: 'PersonType',

    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        intelligence: { type: GraphQLInt },
        strength: { type: GraphQLInt },
        charisma: { type: GraphQLInt },
        worth: { type: GraphQLInt },
        wants: { type: GraphQLString },
        hates: { type: GraphQLString }
    }
});

const PersonQuery = {
};

const PersonMutation = {
    type: PersonType,
    args: {
        input: { type: GraphQLInt }
    },
    resolve: (obj, args, { json }) => {
        const input = {id: uuid(),
            age: Math.floor(Math.random()*88) + 13,
            name: random_name()}
        json('people').post(input);
        // just return the info you inserted, ideally we would just be
        // returning the output from json as return json('pokemon').post(....
        return input;
    }
}

module.exports = {
    Type: PersonType,
    Query: PersonQuery,
    Mutation: PersonMutation
};
