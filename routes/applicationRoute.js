const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const Application = require('../models/applicationModel');

router.post('/application/insert', auth.verifyuser,auth.verifyapplicant,

function(req, res) {
        const JobName = req.body.JobName
        const JobOwner = req.body.JobOwner
        const UserName = req.body.UserName
        const Email = req.body.Email

            const data = new Application({
                JobName: JobName,
                JobOwner: JobOwner,
                UserName: UserName,
                Email: Email,
                })
            
            data.save()
                .then(function(result) {
                    console.log(result)
                    // success message with status code
                    res.status(201).json({ message: "Registered Successfully", success : true, data:result,result:result
                 })
                 console.log("hello")
                })
                .catch(function(err) {
                    res.status(500).json({ error: err })
                })

})
//admin
router.get('/application/all', auth.verifyuser, function(req, res) {
    Application.find({})
        .then(function(data) {
            res.status(200).json({success: true, data: data                
            })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})
//applicant
router.get('/application/get/:name/:title', function(req, res) {
    const username = req.params.name;
    const title = req.params.title;
    
    Application.findOne({UserName:username, JobName:title})
        .then(function(data) {
            res.status(200).json({success: true, data: data
                
            })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})
router.get('/application/owner/:name', auth.verifyuser, function(req, res) {
    const name = req.params.name
    Application.find({JobOwner:name})
        .then(function(data) {
            res.status(200).json({success: true, data: data
                
            })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})
//update approval by job owner

router.put('/application/update/:id', auth.verifyuser, function(req, res) {
    const Accepted = req.body.Accepted
    const id = req.params.id
    Application.updateOne({ _id: id }, {$set:{
        Accepted: Accepted,
           
    }})
        .then(function(result) {
            console.log("update")
            res.status(200).json({ success:true,data:result,message: "Updated!!" })
        })
        .catch(function(err) {
            res.status(500).json({ error: err })
        })

})

//applicant
router.get('/application/apply/:name', auth.verifyuser,auth.verifyapplicant, function(req, res) {
    const name = req.params.name
    Application.find({UserName:name})
        .then(function(data) {
            res.status(200).json({success: true, data: data
                
            })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
})

router.delete('/application/delete/:id', auth.verifyuser, function(req, res) {
    const id = req.params.id
    Application.deleteOne({ _id: id })

    .then(function(result) {
            res.status(200).json({ success: true, message: "Deleted!!" })
        })
        .catch(function(err) {
            res.status(500).json({ error: err })
        })

})
module.exports = router;