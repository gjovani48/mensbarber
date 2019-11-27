const express = require('express')
const router = new express.Router()
const Reservation = require('../model/Reservation')
const Style = require('../model/Style');

const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

router.get('/', (req,res) => {
    Reservation.find({})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.get('/userreservations/:id', (req,res) => {
    Reservation.find({client_id: req.params.id})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})


router.get('/stylecount/:id',(req,res)=>{
    Reservation.find({style_id: req.params.id })
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})


router.get('/completedreservation',(req,res)=>{
  Reservation.find({status: 'Completed'})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})


router.get('/reservationstoday',(req,res)=>{
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    Reservation.find({reservation_date:{ $gte: today, $lt: tomorrow}, $and:[{status: {$ne:'Completed'}}]})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})


router.get('/:id',(req,res)=>{
    Reservation.find({_id:req.params.id})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.post('/',urlEncoded,(req,res)=>{
    var reservation = new Reservation({
        reservation_date: req.body.reservation_date,
        total: req.body.total,
        status: req.body.status,
        client_id: req.body.client_id,
        style_id: req.body.style_id,
    })
    
    reservation.save((err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"success"})
    })
})

router.put('/:id', urlEncoded, (req,res)=>{
    Reservation.updateOne({_id:req.params.id},{

        reservation_date: req.body.reservation_date,
        total: req.body.total,
        status: req.body.status,
        client_id: req.body.client_id,
        style_id: req.body.style_id,

    },(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Record Saved"}])
    })

})

router.put('/incToSTyle/:id', urlEncoded, (req,res)=>{
    Style.updateOne({_id:req.params.id},{ $inc: { count: 1 } },(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Record Saved"}])
    })

})

router.delete('/:id',(req,res)=>{
    Reservation.deleteOne({_id:req.params.id},(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        Reservation.find({},(err,data)=>{
            if(err) throw err 
            res.json([{msg:"Record Deleted"},{data:data}])
        })
        
    })
})


router.put('/starthaircut/:id', urlEncoded, (req,res)=>{
    Reservation.updateOne({_id:req.params.id},{
        reservation_date: req.body.reservation_date,
        total: req.body.total,
        status: req.body.status,
        client_id: req.body.client_id,
        style_id: req.body.style_id,

    },(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Record Saved"}])
    })

})


router.get('/getdate/:date',(req,res)=>{

  var startDate = new Date(req.params.date);
  var endDate = new Date(new Date(req.params.date).setDate(new Date(req.params.date).getDate()+1));

  var reservationTime = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00'];
  var unavailableTime = [];
  var timeArray = [];

  var availableTime = [];

  Reservation.find({reservation_date:{$gte:startDate, $lte:endDate}})
    .populate(['style_id']).exec((err,data)=>{
        if(err) throw err

          for(var i=0; i<data.length; i++){
            unavailableTime[i] = new Date(data[i].reservation_date).toString().slice(16,24);
          }

          timeArray = unavailableTime.concat(reservationTime);

          timeArray.sort();

          for(var i=0; i<timeArray.length; i++){
              if(!(timeArray[i]===timeArray[i+1] || timeArray[i]===timeArray[i-1])){
                availableTime.push(timeArray[i]);
              }
          }

        res.json(availableTime);
    })
})

module.exports = router