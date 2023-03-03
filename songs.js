let mongoose = require("mongoose")

// use mongooese to initialize schema
let mongoSchema = mongoose.Schema

// use mongoSchema to create reference model to songs collection
let songsSchema = new mongoSchema({
    "videoid": String,
    "likes": Number,
    "dislikes": Number
}, {
    collection: "songs"
})

// export the model
module.exports = mongoose.model("songs", songsSchema)
