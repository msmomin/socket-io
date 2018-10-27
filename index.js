const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

const files = [{
        name: 'Dealers Log',
        url: 'getDealersLog',
        filePath: '/files/dealer_log.json'
    },
    {
        name: 'Dealers Rankings',
        url: 'getDealersRankings',
        filePath: '/files/dealer_ranking.json'
    },
]

files.forEach((ele, index) => {
    app.get('/' + ele.url, function (req, res) {
        setResDataType(res).sendFile(__dirname + ele.filePath);
    });
});

app.get('/getDropdownOptions', (req, res) => {
    setResDataType(res).send(JSON.stringify(files));
})

io.on('connection', function (socket) {
    console.log('a user connected');
});

function setResDataType(res) {
    res.setHeader('Content-Type', 'application/json');
    return res;
}

http.listen(3000, function () {
    console.log('listening on *:3000');
});