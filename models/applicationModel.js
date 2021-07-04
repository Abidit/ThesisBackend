const mongoose = require('mongoose');
const Application = mongoose.model('Application', {
    JobName: { type: String },
    JobOwner: { type: String },
    UserName: { type: String },
    Email: { type: String },
    Accepted: { type: String, default:"false" }
})

module.exports = Application;