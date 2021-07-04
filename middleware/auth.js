const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

// main guard
module.exports.verifyuser = function(req, res, next) {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const userdata = jwt.verify(token, 'secretkey')

        User.findOne({ _id: userdata.uID })
            .then(function(allusers) {
                // res.send(allusers)
                req.user = allusers;
                next()
            })
            .catch(function(e) {
                res.status(500).json({ message: 'Authorization Failed' })
            })
    } catch (err) {
        res.status(401).json({ eroor: e })

    }

}


// next guard admin
module.exports.verifyadmin = function(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized User!" })
    } else if (req.user.Usertype !== 'Admin') {
        return res.status(401).json({ message: "Unauthorized User" })
    }
    next();
}

// next guard applicant
module.exports.verifyapplicant = function(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized User!" })
    } else if (req.user.Usertype !== 'Applicant') {
        return res.status(401).json({ message: "Unauthorized User" })
    }
    next();
}

module.exports.verifyowner = function(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized User!" })
    } else if (req.user.Usertype !== 'Job Owner') {
        return res.status(401).json({ message: "Unauthorized User" })
    }
    next();
}