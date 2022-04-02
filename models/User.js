const { Schema, model } = require('mongoose');

const userSchema = new Schema(
{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true 
    },
    passwordHash: {
        type: String,
        required: true
    },
    todos:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Todo' } ]
    }
},
{timestamps: true,}
);
module.exports = model('User', userSchema);