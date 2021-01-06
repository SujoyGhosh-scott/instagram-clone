import mongoose from 'mongoose'

const storyModel = mongoose.Schema({
    user: {
        type: String,
        index: { expires: 300 }
    },
    imgName: {
        type: String,
        index: { expires: 300 }
    },
    caption: {
        type: String,
        index: { expires: 300 }
    },
    profilePic: {
        type: String,
        index: { expires: 300 }
    },
    timestamp: {
        type: String,
        index: { expires: 300 }
    }
})

export default mongoose.model('stories', storyModel)