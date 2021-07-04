// path and mongoose model

const Job = require('../models/jobsModel');
const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/Test';

beforeAll(async () =>{
    await mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
})

afterAll(async () => {

    await mongoose.connection.close();
})

describe('Job Schema test anything', () => {
    var id;
     it('Add product testing anything', () => {
     const job = {
        "Userid":"6068993a09e8431fb064eeaa",
        "JobOwner":"Prajwal Shrestha",
        "JobTitle": "Naya job",
        "Description": "To complete assignment",
        "SkillsNeeded": "Android ",
        "BudgetTime": "80000 21 hours",
     };
     
     return Job.create(job)
     .then((jjj) => {
         id=jjj._id
     expect(jjj.JobTitle).toEqual('Naya job');
     });
     });

     it('Get Jobs',() => {
         return Job.findById({_id : id})
            .then((job)=>{
                expect(job.JobTitle).toEqual('Naya job')
            })
     })

       it('update Job', async () => {
        return Job.findOneAndUpdate({_id :id}, 
       {$set : {'JobTitle' : 'Naya Jobb Okay'}},{new:true})
        .then((pp)=>{
        expect(pp.JobTitle).toEqual('Naya Jobb Okay')
        })
        
    });       

     it('delete job', async () => {
        const data ={
            'JobTitle' : 'Naya Jobb Okay'
        }
        const status = await Job.deleteOne({_id:id});
        expect(status.ok).toBe(1);
    })


    })