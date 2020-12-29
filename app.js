const axios = require('axios');

const weatherUrl = 'http://api.weatherstack.com/current?access_key=6b476a9e41424344bda8f8a777b2414c&query=auckland'
const GeoLocationUrl = `https://us1.locationiq.com/v1/search.php?key=<Your_API_Access_Token>&q=skytower&format=json`

class Reqs {
    gets (url) {
        // use an axios promise wrapped in promise, p,
        // and use the response to either resolve or reject
        // the request 
        let p = new Promise((resolve, reject) => {
            axios.get(url)
            .then(res => {
                console.log("then 1");
                resolve(res)
            })
            .catch(err => {
                console.log("catch 1");
                reject(err)
            })  
        })

        // From promise p, log the information provided,
        // whether resolved or not
        p.then(res => {
            console.log("then 2");
            console.log(res.data);
        })
        .catch(err => {
            console.log("catch 2");
            console.log('error ' + err);
        })
    }
}

let reqs = new Reqs()
reqs.gets(url)

