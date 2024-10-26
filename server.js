
const serverConfig = require('./çonfig/server.config')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes');
const MongoClient = require('mongodb').MongoClient;
const rateLimit = require('express-rate-limit');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));

let db;

const client = new MongoClient(process.env.URI, { family: 4 })

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});
app.use(limiter);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        db = client.db('Form');

        app.listen(serverConfig.PORT, serverConfig.HOST, () => {
            console.log(`Server is listening on ${serverConfig.HOST}: ${serverConfig.PORT}`);
        });

    } catch (error) {
        console.log('Error occured while connecting to MongoDb Atlas', error);
    }
}

run().catch(console.error);

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.render('index');
});
