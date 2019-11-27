const express = require('express')
const jwt = require('jsonwebtoken');
const router = new express.Router()
const User = require('../model/User')

const bodyParser = require('body-parser')
const urlEncoded = bodyParser.json()

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/',(req,res)=>{
    User.find({role:"client"},(err,data)=>{
        if(err) throw err 
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    User.find({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err
        res.json(data)
    })
})

router.post('/login', urlEncoded, (req,res)=>{
    User.findOne({email:req.body.email}, (err,data)=>{
        if(err) throw err
        
        else{
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if(result){
                        let payload = { subject: data._id}
                        let token = jwt.sign(payload, 'secretkey');
                        res.json({msg:"success", user: data, token: token})
                    }
                })
            }
            else{
                res.json({msg:"error"})
            }
        }
    })
})


router.post('/',urlEncoded,(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        var user = new User({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            phone:  req.body.phone,
            email: req.body.email,
            password: hash,
            role: "client"
        })

        user.save((err,data)=>{
            if(err) res.json({msg:"Invalid Request"})
            let payload = { subject : data._id }
            let token = jwt.sign(payload,'secretkey')
            res.json({msg:"success", token: token})
        })
    })
})

router.put('/:id',urlEncoded,(req,res)=>{
    User.updateOne({_id:req.params.id},{
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email
    },(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        User.find({_id:req.params.id}).exec((err,data)=>{
            if(err) throw err
            res.json([{msg:"Record Updated"},{data:data}])
        })
    })
})

router.delete('/:id',(req,res)=>{
    User.deleteOne({_id:req.params.id},(err)=>{
        if(err) res.json({msg:"Invalid Request"})
        else res.json({msg:"User deleted"})
    })
})

module.exports = router