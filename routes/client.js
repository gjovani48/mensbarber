const express = require('express')
const router = new express.Router()
const Client = require('../model/Client')
const Stylist = require('../model/Stylist')

const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

router.get('/',(req,res)=>{
    Client.find({},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    Client.find({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.post('/login', urlEncoded, (req,res)=>{
    Client.findOne({email:req.body.email, password:req.body.password},(err, data)=>{
        if(err) {
            res.json({msg:err}) 
        }
        else {

            res.json({msg:"success", client: data})
        }

    })
})


router.post('/',urlEncoded,(req,res)=>{
    var client = new Client({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email,
        password: req.body.password
    })

    client.save((err)=>{
        if(err) res.json({msg:"Invalid Request"})
        res.json({msg:"Record Saved"})
    })
})

router.put('/:id',urlEncoded,(req,res)=>{
    Client.updateOne({_id:req.params.id},{
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email
    },(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        Client.find({_id:req.params.id}).exec((err,data)=>{
            if(err) throw err
            res.json([{msg:"Record Updated"},{data:data}])
        })
    })
})

router.delete('/:id',(req,res)=>{
    Client.deleteOne({_id:req.params.id},(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        Client.find({},(err,data)=>{
            if(err) throw err 
            res.json([{msg:"Record Deleted"},{data:data}])
        })
    })
})

module.exports = router