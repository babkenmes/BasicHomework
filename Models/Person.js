const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Person = new Schema({
    name: { required: true, type: String },
    age: { type: Number, required: true, default: 18 },
    salary: { type: Number, default: 1000000 }
})

module.exports = mongoose.model('Person', Person);