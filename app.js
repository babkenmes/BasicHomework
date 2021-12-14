require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const Person = require("./Models/Person")
const multer = require("multer")
mongoose
    .connect(
        ' mongodb+srv://albertdb:albertdb449@cluster0.wyknk.mongodb.net/sampletest?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log('mongodb conected'))
    .catch(err => console.log(err));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const UsersSchema = new mongoose.Schema({
    imgname: {
        type: String,
        required: true,
    }
});

app.get('/', (req, res) => {
    Users.create({
        imgname: '2.jpg',
    })
        .then((users) => res.send(users))
        .catch((err) => res.send(err));
})

const Users = mongoose.model('Users', UsersSchema);


app.get('/', (req, res) => {
    Users.find({}, function (err, users) {
        res.render('index', {
            imageslist: users
        })
    })
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/upload_img',upload.single("image"),(req,res)=>{
    const imgBase64 = req.file.buffer.toString("base64")
    Person.create({
        name: 'Johny',
        img:imgBase64
    })
        .then((users) => res.send(users))
        .catch((err) => res.send(err));
})

//TODO add modify person
//TODO add delete person

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
