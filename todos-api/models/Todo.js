const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
{
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        //required: true
    }
},
{timestamps: true,}
);
module.exports = model('Todo', todoSchema);