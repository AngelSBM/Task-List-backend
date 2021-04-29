const { Schema, model } = require('mongoose');


const ListSchema = Schema({

    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true 
    }

});



module.exports = model('List', ListSchema);