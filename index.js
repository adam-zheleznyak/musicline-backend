const http = require('http')
const port = 3000

const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
    clientId: 'b82cbfef542541bfb57f2e9077b09176',
    clientSecret: '78b271cf555649cc8cfb108e61ab3f6c',
    redirectUri: 'http://206.189.223.220:8080/callback'
});

async function requestHandler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    if (request.url.startsWith('/grant/')) {
        try {
            const data = await spotifyApi.authorizationCodeGrant(request.url.substr(7))
            response.end(data.body['access_token'] + '|||||' + data.body['refresh_token'])
            console.log(data.body)
        } catch (err) {
            console.log(err)
            response.end('error')
        }
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
