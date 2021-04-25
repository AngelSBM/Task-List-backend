const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true 
    },

    _listid: {
        type: mongoose.Types.ObjectId,
        require: true
    }

});



module.exports = mongoose.model('Task', TaskSchema);