const express = require('express');
const router = new express.Router();
const Style = require('../model/Style');

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();

router.get('/',(req,res)=>{
    Style.find({},(err,data)=>{
        if(err) throw err; 
        res.json(data);
    });
});

router.get('/trending',(req,res)=>{
    Style.find({},(err,data)=>{
        if(err) throw err; 
        res.json(data);
    }).limit(8);
});

router.get('/:id',(req,res)=>{
    Style.find({_id:req.params.id}).exec((err,data)=>{
        if(err) throw err;
        res.json(data);
    });
});


// router.post('/',urlEncoded,(req,res)=>{
//     var style = new Style({
//         firstname: req.body.firstname,
//         middlename: req.body.middlename,
//         lastname: req.body.lastname,
//         phone:  req.body.phone,
//         email: req.body.email
//     });


//     console.log(style);

//     style.save((err)=>{
//         if(err) res.json({msg:"Invalid Request"});
//         res.json([{msg:"Record Saved"},{style:style}]);
//     });
// });

// router.put('/:id',urlEncoded,(req,res)=>{
//     Style.updateOne({_id:req.params.id},{
//         firstname: req.body.firstname,
//         middlename: req.body.middlename,
//         lastname: req.body.lastname,
//         phone:  req.body.phone,
//         email: req.body.email
//     },(err)=>{
//         if(err) res.json({msg:"Invalid Request"});
//         Style.find({_id:req.params.id}).exec((err,data)=>{
//             if(err) throw err;
//             res.json([{msg:"Record Updated"},{data:data}]);
//         });
//     });
// })

// router.delete('/:id',(req,res)=>{
//     Style.deleteOne({_id:req.params.id},(err)=>{
//         if(err) res.json({msg:"Invalid Request"});
//         Style.find({},(err,data)=>{
//             if(err) throw err; 
//             res.json([{msg:"Record Deleted"},{data:data}]);
//         });
//     });
// });

module.exports = router;