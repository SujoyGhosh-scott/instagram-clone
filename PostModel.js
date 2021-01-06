import mongoose from 'mongoose'

const postModel = mongoose.Schema({
    user: String,
    profilePic: String,
    imgName: String,
    caption: String,
    timestamp: String,
    likes: Number,
    comments: [{comment: String, user: String, profilePic: String}],
})

export default mongoose.model('posts', postModel)