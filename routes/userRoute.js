const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const upload = require("../middleware/upload")
const auth = require('../middleware/auth')

const User = require('../models/userModel');
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

router.post('/user/insert', 
[
        check('Fullname', "Fullname is required.").not().isEmpty(),
        check('Email', "Invalid Email").isEmail(),
        check('Email', "Email is required.").not().isEmpty()
    ],
    function(req, res) {
        const errors = validationResult(req);
        //res.send(errors.array())
        if (errors.isEmpty()) {
            const Fullname = req.body.Fullname
            const Email = req.body.Email
            const Username = req.body.Username
            const Password = req.body.Password
            const Usertype = req.body.Usertype
            console.log(Fullname)

            bcryptjs.hash(Password, 10, function(error, hash) {
                const data = new User({
                    Fullname: Fullname,
                    Email: Email,
                    Username: Username,
                    Password: hash,
                    Usertype: Usertype
                })
                data.save()
                    .then(function(result) {
                        // success message with status code
                        console.log(data)
                        
                        res.status(201).json({ message: "Registered Successfully", success : true,data:data })
                    })
                    .catch(function(err) {
                        res.status(500).json({ error: err })
                    })
            })

        } else {
            // invalid data from client

            res.status(400).json(errors.array())
        }
//sdfg

    })

// login with token
router.post('/user/login', function(req, res) {
    const Username = req.body.Username
    const Password = req.body.Password
   
    
    User.findOne({ Username: Username })
        .then(function(userData) {
            if (userData == null) {
                return res.status(401).json({ success : false })
                
            }
            // lets now compare the Password
            bcryptjs.compare(Password, userData.Password, function(err, result) {
                if (result == false) {
                    //Username or Password invalid
                    return res.status(401).json({ message: "Invalid Credentials.", success : false })
                }
                // now generating token.
                const token = jwt.sign({ uID: userData._id }, 'secretkey')
                console.log(token)
                res.status(200).json({success : true, token: token, data: userData })
               
            })
        })
        .catch(function(e) {
            res.status(500).json({ message: "Invalid Username", success: false })
        })
})

//get all by admin
//admin
router.get('/user/all', auth.verifyuser, function(req, res) {
    User.find({})
        .then(function(data) {
            res.status(200).json({success: true, data: data
            })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})

// get one
router.get('/user/one/:id', function(req, res) {
    const id = req.params.id;
    User.findOne({ _id: id })
        .then(function(data) {
            res.status(200).json(data)
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})

router.put('/photo/:id', upload.single('file'), function(req,res){
    const id = req.params.id
    const file = req.file
    console.log(req.file)
    User.updateOne({_id:id},{
        Image:file.filename
    })
    .then(function(result){
                res.status(200).json({success:true, message:'uploaded', data:result})
            })  
            .catch(function(err){
                res.status(500).json({
                    success:false,
                    error:err
                })
            })
        })

    

router.put('/user/update', auth.verifyuser, function(req, res) {
    const Fullname = req.body.Fullname
    const Email = req.body.Email
    const Username = req.body.Username
    const Password = req.body.Password
    const Usertype = req.body.Usertype

    User.updateOne({ _id: id }, {
        Fullname: Fullname,
        Email: Email,
        Username: Username,
        Password: Password,
        Usertype: Usertype
        })
        .then(function(result) {
            res.status(200).json({ message: "Updated!!" })
        })
        .catch(function(err) {
            res.status(500).json({ error: err })
        })

})

module.exports = router;