const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs', {
    Userid:{ type: String},
    JobOwner:{ type: String},
    JobTitle: { type: String },
    Description: { type: String },
    SkillsNeeded: { type: String },
    BudgetTime: { type: String },

})

module.exports = Jobs;