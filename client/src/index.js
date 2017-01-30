const {ApolloClient} = require('apollo-client');
const {createNetworkInterface} = require('apollo-client');
const gql = require('graphql-tag');
require('isomorphic-fetch');

console.log('Starting Apollo Client');

const networkInterface = createNetworkInterface({ uri: 'http://localhost:8080/graphql' });
networkInterface.use([{
    applyMiddleware(req, next) {
        // we can apply tokens to the header here
        next();
    }
}]);

const client = new ApolloClient({
    initialState: {apollo: ""},
    networkInterface: networkInterface
});

const workspace = d3.select("#root")
    .append('svg')
        .attr('width', 500)
        .attr('height', 500)

console.log('Client starting');

document.getElementById('get').onclick = () => {
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
        console.log(results.data);
        // console.log(client.store.getState().apollo);
    }).catch(error => {
        console.log('error: ', error);
    });
};


document.getElementById('add').onclick = () => {
    client.mutate({
        mutation: gql`mutation{
        addPerson {
            id,
                name,
                x,
                y
        }
    }`
    }).then(results => {
        console.log(results.data);
        // console.log(client.store.getState().apollo);
    }).catch(error => {
        console.log('error: ', error);
    });
};



// console.log('Starting client');
