
const http = require('http');
const router = require('./manageRoutes');

router.addController(require('./controllers'));

router.addRoutes([
    { url: '/home', method: 'GET', controller: 'get_home' },
    { url: '/home', method: 'POST', controller: 'post_home' },
    { url: '/home', method: 'GET', controller: 'get_home'}
]);

http.createServer((req, res) => { router.handler(req, res) })
    .listen(3000, () => {
        console.log("http up on port 3000");
    })




