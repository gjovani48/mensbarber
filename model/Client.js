const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/salon',{useNewUrlParser:true});

const Client = mongoose.model('Client',{

    firstname: {
        type: String,
        require: true
    },
    middlename: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    phone:  {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        required: true
    }


});

module.exports = Client;