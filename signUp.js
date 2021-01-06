import mongoose from 'mongoose'

const signup = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: String,
    bio: String,
    likes: Array,
    posts: Array,
})

export default mongoose.model('users', signup)
