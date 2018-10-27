var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
        res.sendFile(__dirname + ele.filePath);
    });
});

app.get('/getDropdownOptions', (req, res) => {
    res.send(files);
})

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});