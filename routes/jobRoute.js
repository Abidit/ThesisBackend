const e = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

const Job = require('../models/jobsModel');

router.post('/jobs/insert', auth.verifyuser, function (req, res) {

    const Userid = req.body.Userid
    const JobOwner = req.body.JobOwner
    const JobTitle = req.body.JobTitle
    const Description = req.body.Description
    const SkillsNeeded = req.body.SkillsNeeded
    const BudgetTime = req.body.BudgetTime

    const data = new Job({
        Userid: Userid,
        JobTitle: JobTitle,
        Description: Description,
        SkillsNeeded: SkillsNeeded,
        BudgetTime: BudgetTime,
        JobOwner: JobOwner
    })
    data.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: 'The new job is inserted', data: result })
        })
        .catch(function (err) {
            res.status(500).json({ error: err })

        })
})

router.put('/job/update/:id', auth.verifyuser, function (req, res) {
    const JobTitle = req.body.JobTitle
    const Description = req.body.Description
    const SkillsNeeded = req.body.SkillsNeeded
    const BudgetTime = req.body.BudgetTime
    const id = req.params.id
    console.log("fghjk")
    Job.updateOne({ _id: id }, {
        $set: {
            JobTitle: JobTitle,
            Description: Description,
            SkillsNeeded: SkillsNeeded,
            BudgetTime: BudgetTime
        }
    })
        .then(function (result) {
            
            return res.status(200).json({ success: true, data: result, message: "Updated!!" })
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })

})


router.delete('/job/delete/:id', auth.verifyuser, function (req, res) {
    const id = req.params.id
    Job.deleteOne({ _id: id })

        .then(function (result) {
            res.status(200).json({ success: true, message: "Deleted!!" })
            
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })

})

router.get('/jobs/all', function (req, res) {
    Job.find({})
        .then(function (data) {
            res.status(200).json({
                success: true,
                data: data
            })
            console.log("hello")
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})

router.get('/job/one/:id', function (req, res) {
    const id = req.params.id;
    Job.findOne({ _id: id })
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
})

module.exports = router;