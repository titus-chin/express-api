// import express from node_modules
let express = require("express")
let mongoose = require("mongoose")
const songs = require("./songs")
let cors = require("cors")

// create express app
let app = express()

// configure cors
app.use(cors())

app.use(express.json())

// use mongoose to connect to database
let connectionString = "mongodb+srv://mongo-user:mongopassword@cluster0.mprok4h.mongodb.net/youtube"
mongoose.connect(connectionString)
let db = mongoose.connection

db.once("open", () => {
    console.log("Connection to mongodb in cloud is success!!!!")
})

/*
create root endpoint -> /
http://localhost:8080/
app.get(endpoint, callback)
endpoint -> /, /todos /get/friends/all
callback -> (incoming request, outgoing response) => {}
*/
app.get("/", (request, response) => {
    console.log("Request received...")
    console.log(request.url)
    response.send("<h1>Hello from server!</h1>")
})

/*
create root endpoint -> /help
http://localhost:8080/help
*/
app.get("/help", (request, response) => {
    console.log("Request received...GET")
    console.log(request.url)
    response.send("<h1>HELP from server!!</h1>")
})

/*
create endpoint -> /showrequest
http://localhost:8080/showrequest
*/
app.get("/showrequest", (request, response) => {
    console.log("Request received....GET")
    console.log("*************Request start***************")
    console.log(request)
    console.log("*************Request ends****************");
    response.send("<h1>See Request object in JSON in server console!</h1>")
})

/*
create root endpoint -> /help
http://localhost:8080/help
*/
app.post("/help", (request, response) => {
    console.log("Request received...POST")
    console.log(request.url)
    response.json({
        status: "Success",
        request_type: "POST",
        message: "Send email to junhongchin@airasia.com",
        meaning: "I will add a new data to the server"
    })
})

/*
create root endpoint -> /help
http://localhost:8080/help
*/
app.put("/help", (request, response) => {
    console.log("Request received...PUT")
    console.log(request.url)
    response.json({
        status: "Success",
        request_type: "PUT",
        message: "Send email to junhongchin@airasia.com",
        meaning: "I will update a data on the server"
    })
})

/*
create root endpoint -> /help
http://localhost:8080/help
*/
app.delete("/help", (request, response) => {
    console.log("Request received...DELETE")
    console.log(request.url)
    response.json({
        status: "Success",
        request_type: "DELETE",
        message: "Send email to junhongchin@airasia.com",
        meaning: "I will delete a data from the server"
    })
})

// get data from mongodb database
/*
http://localhost:8080/get/all/songs
*/
app.get("/get/all/songs", (request, response) => {
    // use songs reference/model in line 4 to interact
    // with songs collection in mongodb database
    songs.find({})
        .then((data) => {
            response.json(data)
        })
        .catch((error) => {
            response.json(error)
        })
})

/*
http://localhost:8080/add/song
*/
app.post("/add/song", (request, response) => {
    console.log("Request body received from frontend")
    console.log(request.body)
    let newSong = new songs()
    console.log(newSong)
    newSong.videoid = request.body.videoid
    newSong.likes = request.body.likes
    newSong.dislikes = request.body.dislikes
    console.log(newSong)
    // insert newSong to mongoDB database
    newSong.save()
        .then((data) => {
            response.json({
                "message": "success",
                "status": data
            })
        })
        .catch((error) => {
            response.json(error)
        })
})

/*
http://localhost:8080/remove/song/6400a18dc7958dfc6cf16080
*/
app.delete("/remove/song/:myid", (request, response) => {
    console.log("Remove one document from song collection...")
    console.log("id: " + request.params.myid)
    // use myid to find and remove song from mongodb
    songs.findByIdAndDelete(request.params.myid)
        .then((data) => {
            response.json(data)
        })
        .catch((error) => {
            response.json(error)
        })
})

/*
http://localhost:8080/update/song/63ff4fce83b54b93c16f1080
*/
app.put("/update/song/:id", (request, response) => {
    // Received path variable
    // console.log("id: " + request.params.id)
    console.log(`id received: ${request.params.id}`)
    console.log("Request body received....")
    console.log(request.body)
    // Update song collection with songUpdate in mongodb database
    songs.updateOne({ _id: request.params.id }, {
        $set: {
            videoid: request.body.videoid,
            likes: request.body.likes,
            dislikes: request.body.dislikes
        }
    })
        .then((data) => {
            response.json(data)
        })
        .catch((error) => {
            response.json(error)
        })

    // response.json({})
})

// define port for the API
let PORT = 8080

// Listen on port
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})
