const mongoose = require('mongoose')
const { Schema } = mongoose;

const User = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Schema.Types.ObjectID,
        ref: "Role",
        required: true
    }
},{
    collection: 'user'
})

module.exports = mongoose.model('User', User)