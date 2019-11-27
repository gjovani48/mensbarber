const express = require('express');
const router = new express.Router();
const Style = require('../model/Style');

router.get('/',(req,res)=>{
    Style.find({},(err,data)=>{
        if(err) throw err; 
        res.json(data);
    }).sort({count: -1});
});

router.get('/trending',(req,res)=>{
    Style.find({},(err,data)=>{
        if(err) throw err; 
        res.json(data);
    }).limit(8).sort({count: -1});
});

router.get('/:id',(req,res)=>{
    Style.find({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err;
        res.json(data);
    });
});

module.exports = router;