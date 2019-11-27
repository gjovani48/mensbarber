const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/salon',{useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connect('mongodb+srv://admin:admin@cluster0-er17b.mongodb.net/test?retryWrites=true&w=majority
',{useNewUrlParser:true, useUnifiedTopology: true});

const User = mongoose.model('User',{

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
    },

    role: {
        type: String,
        required: true
    },

})

module.exports = User;
