const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const TaskSchema = Schema({

    title: {
        type: String,
        require: true,
        minlength: 1 
    },

    listId: {
        type: mongoose.Types.ObjectId,
        require: true
    }

});



module.exports = model('Task', TaskSchema);