const mongoose = require('mongoose');

const adminScehma = new mongoose.Schema({
    name: { type: String, min: 3, require: true },
    username: { type: String, min: 3, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true, min: 4 },
    admin: { type: Boolean, default: false } //to check if admin  or not
});

module.exports = mongoose.model("Admin", adminScehma);