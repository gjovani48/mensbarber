const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/salon',{useNewUrlParser:true});

const Stylist = mongoose.model('Stylist',{

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
    }


});

module.exports = Stylist;