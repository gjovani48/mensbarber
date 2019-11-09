const express = require('express');
const router = new express.Router();
const Stylist = require('../model/Stylist');

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();

router.get('/',(req,res)=>{
    Stylist.find({},(err,data)=>{
        if(err) throw err; 
        res.json(data);
    });
});

router.get('/:id',(req,res)=>{
    Stylist.find({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err;
        res.json(data);
    });
});


router.post('/',urlEncoded,(req,res)=>{
    var stylist = new Stylist({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email
    });

    console.log(stylist);

    stylist.save((err)=>{
        if(err) res.json({msg:"Invalid Request"});
        res.json([{msg:"Record Saved"},{data:stylist}]);
    });
});

router.put('/:id',urlEncoded,(req,res)=>{
    Stylist.updateOne({_id:req.params.id},{
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        phone:  req.body.phone,
        email: req.body.email
    },(err)=>{
        if(err) res.json({msg:"Invalid Request"});
        
        Stylist.find({_id:req.params.id}).exec((err,data)=>{
            if(err) throw err;
            res.json([{msg:"Record Updated"},{info:data}]);
        });
    });
})

router.delete('/:id',(req,res)=>{
    Stylist.deleteOne({_id:req.params.id},(err)=>{
        if(err) res.json({msg:"Invalid Request"});
        Stylist.find({},(err,data)=>{
            if(err) throw err; 
            Stylist.find({},(err,data)=>{
                if(err) throw err; 
                res.json([{msg:"Record Deleted"},{data:data}]);
            });
        });
    });
});

module.exports = router;