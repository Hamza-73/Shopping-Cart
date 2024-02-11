const connectToMongo = require('./db')

const adminRoutes = require('./routes/Admin')

connectToMongo()

const express = require('express')
const app = express()
const port = 5000


// Middlewares
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    exposedHeaders: 'Authorization',
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

require("dotenv").config();
app.use(express.json());

app.use('/admin', adminRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})