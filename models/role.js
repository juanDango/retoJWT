const mongoose = require('mongoose')
const { Schema } = mongoose;

const Role = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    permisos:[
        {
            ruta: String,
            ids: []
        }
    ]
},{
    collection: 'role'
})

module.exports = mongoose.model('Role', Role)