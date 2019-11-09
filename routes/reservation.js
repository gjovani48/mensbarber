const express = require('express')
const router = new express.Router()
const Reservation = require('../model/Reservation')

const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

router.get('/',(req,res)=>{
    Reservation.find({})
    .populate(['client_id','style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    Reservation.findOne({_id:req.params.id})
    .populate(['style_id']).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.post('/',urlEncoded,(req,res)=>{
    var reservation = new Reservation({
        reservation_date: req.body.reservation_date,
        total: req.body.total,
        payment_status: req.body.payment_status,
        client_id: req.body.client_id,
        style_id: req.body.style_id,
    })
    
    reservation.save((err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json([{msg:"Record Saved"},{data:reservation}])
    })
})

router.put('/:id', urlEncoded, (req,res)=>{
    Reservation.updateOne({_id:req.params.id},{

        reservation_date: req.body.reservation_date,
        total: req.body.total,
        payment_status: req.body.payment_status,
        client_id: req.body.client_id,
        style_id: req.body.style_id,

    },(err)=>{
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

module.exports = router