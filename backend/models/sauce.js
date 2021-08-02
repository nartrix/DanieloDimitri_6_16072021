const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer:{ type:String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type:Number, required: false },
    dislikes: { type:Number, required: false },
    usersLiked: { type: [String], required: false }, // like array which contains user id
    usersDisliked: { type: [String], required: false }, // dislike array contains user id

})

module.exports = mongoose.model('sauce', sauceSchema);