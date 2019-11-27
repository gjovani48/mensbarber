const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/salon',{useNewUrlParser:true, useUnifiedTopology: true});

const Reservation = mongoose.model('Reservation',{

    reservation_date:{
        type:Date,
        require:true
    },

    total: {
        type:Number,
        require:true
    },

    client_id: {
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },

    style_id: {
        type:Schema.Types.ObjectId,
        ref:'Style',
        require:true
    },

    status: {
        type:String,
        require:true
    },
    
    date_created: {
        type:Date,
        default: Date.now
    },

});

module.exports = Reservation;