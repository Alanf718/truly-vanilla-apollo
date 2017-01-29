const {ApolloClient} = require('apollo-client');
const {createNetworkInterface} = require('apollo-client');
const gql = require('graphql-tag');
// require('isomorphic-fetch');

console.log('Starting Apollo Client');

const client = new ApolloClient({
    initialState: {apollo: ""},
    networkInterface: createNetworkInterface({ uri: 'http://localhost:8080/graphql' })
});

console.log('Client starting');

client.query({
    query: gql`{
      people {
        id,
        name,
        age,
        intelligence,
        strength,
        charisma
      }
    }`
}).then(results => {
    console.log(results);
    console.log(client.store.getState().apollo);
}).catch(error => {
    console.log('error: ', error);
});


// console.log('Starting client');
