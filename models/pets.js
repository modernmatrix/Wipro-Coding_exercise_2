const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema(
    {
    
        name: {
            type: String,
            trim:true,
            require:true
        },
        age: {
            type: Number,
            trim:true,
            require:true
        },
        color: {
            type: String,
            trim:true,
            require:true
        }
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('Pets', petsSchema);