require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const Person = require("./Models/Person")


const { DB_CONNECTION_STRING } = process.env

mongoose.connect(DB_CONNECTION_STRING)
const db = mongoose.connection

db.once('open', async function () {

    const john = new Person({ name: "John" })
    await john.save()
    console.log('MongoDB successfully connected');

})

db.on('error', function (err) {
    console.log(err);
});



app.get('/:id', async (req, res) => {

    const id = req.params.id
    const person = await Person.findById(id)
    res.send(person)

})


app.get('/getyoungsters', async (req, res) => {

    const people = await Person.find()
    res.send(people)

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
