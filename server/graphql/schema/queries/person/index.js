const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
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
        hates: { type: GraphQLString },
        x: { type: GraphQLInt },
        y: { type: GraphQLInt }
    }
});

const PersonQuery = {
    type: new GraphQLList(PersonType),
    description: 'Long live the people!',
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
        return json('people').get(query).then(results => {
            return results;
        });
    }
};

const PersonMutation = {
    type: PersonType,
    resolve: (obj, args, { json }) => {
        const input = {id: uuid(),
            name: random_name(),
            age: Math.floor(Math.random()*88) + 13,
            intelligence: Math.floor(Math.random()*10) + 1,
            strength: Math.floor(Math.random()*10) + 1,
            charisma: Math.floor(Math.random()*10) + 1,
            worth: Math.floor(Math.random()*1000000) + 1,
            x: Math.floor(Math.random()*10),
            y: Math.floor(Math.random()*10)
        };

        console.log(input);
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
