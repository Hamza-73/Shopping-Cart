const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/shopping_cart';

const connectToMongo = () => {
    mongoose
        .connect(mongoURL)
        .then(() => {
            console.log("DB Connetion Successfull");
        })
        .catch((err) => {
            console.log(err.message);
        });
}

module.exports = connectToMongo;