const ncSchema = require('./schema/index');
const {graphql} = require('graphql');
const app = require('express')();

const json = require('./../database/json/index');

app.use('/graphql', (req, res) => {
    const requestData = req.body;
    if(Array.isArray(requestData)){
        const requests = requestData.map(request => {
            return {query: request.query, variables: request.variables ? request.variables : {}};
        });

        Promise.all(
            requests.map(r => graphql(ncSchema, r.query,
                {}, { json }, r.variables))
        ).then(results => {
            res.status(200).send(results);
        });
    } else {
        require('express-graphql')({ // needed to expose graphql via http
            schema: ncSchema,
            graphiql: true, // flag should only be set for the dev environment so you can have your graphql editor
            context: {
                json // gets passed to every graphql resolve function
            }
        })(req, res);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.log('GraphQL Layer running @ port :' + PORT);