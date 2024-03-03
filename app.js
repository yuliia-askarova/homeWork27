const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);

app.use(express.static('public'))

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        wss.clients.forEach(c => {
                c.send(message.toString())
        })
    });
});
app.get('/', (req, res) => {
    res.send('Привет, я HTTP сервер!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
