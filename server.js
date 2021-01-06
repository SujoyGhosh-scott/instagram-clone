import express from "express"
import Grid from "gridfs-stream";
import GridFsStorage from "multer-gridfs-storage"
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors"
import path from 'path'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//importing all models
import postModel from './PostModel.js'
import storyModel from "./StoryModel.js"
import signup from './signUp.js'

/** setting up Grid */
Grid.mongo = mongoose.mongo;

/** app config */
const app = express()
const port = process.env.PORT || 9000;

/** middleware */
app.use(bodyParser.json())
app.use(cors())

/** DB config */
dotenv.config()

//connecting to DB
const conn = mongoose.createConnection(process.env.mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }, () => console.log("DB connected!"));

mongoose.connect(process.env.mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


/** storing images */
let gfs;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    //we'll be storing all the images in the images collection 
    gfs.collection("images");
}) 

const storage = new GridFsStorage({
    url: process.env.mongoUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: "images"
            }

            resolve(fileInfo)
        })
    }
})

// multer is used to upload images/files to db
const upload = multer({ storage })


/** api routes */
//Home
app.get("/", (req,res) => res.status(200).send("this is working!"))

//sign up new user!
app.post("/signup", async (req,res) => {
    //checking if the user already exists
    const existEmail = await signup.findOne({ email: req.body.email })
    if(existEmail != null) return res.status(400).send('Email already exisits!')

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //creating user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        bio:"",
        profilePic: "",
        likes: [],
        posts: []
    }
    signup.create(user, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send({id: data._id})
        }
    })
})

//logging in
app.post('/login', async (req, res) => {
    const user = await signup.findOne({ email: req.body.email})

    //email checking
    if(user == null) res.status(400).send('Email not found!')

    //password checking
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password!')

    //creating and assigning the token
    const token = jwt.sign({_id: user._id}, process.env.token_secret)
    res.header('auth-token', token).send(token)
})

//uploading a single image
app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

//fetching a single image
app.get('/retrieve/image/single', (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if(!file || file.length == 0) {
                res.status(404).json({ err: 'file not found!' })
            } else {
                const readStream = gfs.createReadStream(file.filename)
                readStream.pipe(res)
            }
        }
    })
})

//uploading a post
app.post('/upload/post', (req, res) => {
    const dbPost = req.body

    postModel.create(dbPost, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//fetching all the posts for the feed page
app.get('/retrieve/posts', (req, res) => {
    postModel.find((err, data) => {
        if(err) {
            res.status(500).send(err) 
        } else {
            data.sort((b,a) => {
                return a.timestamp - b.timestamp
            })

            res.status(200).send(data)
        }
    })
})

//add a story
app.post('/upload/story', (req, res) => {
    const dbStory = req.body
    
    storyModel.create(dbStory, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

//fetching all stories
app.get('/retrieve/stories', (req, res) => {
    storyModel.find((err, data) => {
        if(err) {
            res.status(500).send(err) 
        } else {
            data.sort((b,a) => {
                return a.timestamp - b.timestamp
            })

            res.status(200).send(data)
        }
    })
})

/** listening */
app.listen(port, () => console.log(`listening on port ${port}`))

