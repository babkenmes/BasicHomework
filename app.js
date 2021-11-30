require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Person = require("./Models/Person")

const { DB_CONNECTION_STRING } = process.env

mongoose.connect(DB_CONNECTION_STRING)
const db = mongoose.connection

db.once('open', async function () {


    console.log('MongoDB successfully connected');

})

db.on('error', function (err) {
    console.log(err);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/api/people', async (req, res) => {
    try {
        const people = await Person.find()
        res.send(people)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.get('/api/people/:id', async (req, res) => {
    try {
        const id = req.params.id
        const person = await Person.findById(id)
        res.send(person)
    }
    catch (err) {
        res.status(500).send(err)
    }
})



app.post('/api/people', async (req, res) => {

    try {
        const { name, salary, age } = req.body;
        const person = new Person({ name, salary, age })
        await person.save()
        res.send(person)
    }
    catch(err){
        res.status(500).send(err)
    }
    
})
//TODO add modify person
//TODO add delete person

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
