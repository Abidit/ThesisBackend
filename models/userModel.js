const mongoose = require("mongoose");

const User = mongoose.model('User', {
    Fullname: {type: String,required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Username: {
        type: String, required: true, unique: true
    },
    Password: {
        type: String, required: true
    },
    Usertype: {
        type: String,
        enum: ['Admin', 'Job Owner', 'Applicant']
    },
    Image : { type: String, default:null,
    }
})

module.exports = User;