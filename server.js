const http = require('http');
const app = require('./app');

const mongoose = require('mongoose');

//PASSWORD est à remplacé par le mot de passe créer lors de la création de la base de donnée présent mongoDB Atlas
mongoose.connect('mongodb+srv://jorisbertier:wczB0AG9VaNbnqDV@cluster0.kz6mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
