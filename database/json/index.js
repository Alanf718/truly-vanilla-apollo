const request = require('superagent');

/**
 * This just wraps superagent in a promise and exposes a get and post method to use in conjunction with
 * the superagent request
 * @param route
 */
const jsonPromise = (route) => ({
    get: (queryJson={}) => new Promise((resolve, reject) => {
        request.get(`http://localhost:4000/${route}`)
            .query(queryJson)
            .end(function(err, res){
            if(err) {
                return reject('Error');
            }

            return resolve(JSON.parse(res.text));
        });
    }),

    post: (reqJson) => new Promise((resolve, reject) => {
        request.post(`http://localhost:4000/${route}`)
            .send(reqJson)
            .end(function(err, res) {
                if(err) {
                    return reject('Error');
                }

                return resolve(JSON.parse(res.text));
        });
    })
});

module.exports = jsonPromise;

// jsonPromise('pokemon').get({id: 1}).then
// jsonPromise('attack').post({...data}).then


// jsonPromise
//     .then(json => console.log(json))
//     .catch(err => console.log(err))
