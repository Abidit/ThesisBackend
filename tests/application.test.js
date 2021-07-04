
const Application = require('../models/applicationModel');
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
        const app = {
           "JobName":"New Job",
           "JobOwner":"Prajwal Shrestha",
           "UserName": "Abidit",
           "Email": "abi@mail.com"
        };
        
        return Application.create(app)
        .then((jjj) => {
            id = jjj._id
        expect(jjj.JobName).toEqual('New Job');
        });
        });

        it('Get Application',() => {
            return Application.findById({_id : id})
               .then((app)=>{
                   expect(app.JobName).toEqual('New Job')
               })
        })

        it('update Application', async () => {
            return Application.findOneAndUpdate({_id :id}, 
           {$set : {'JobName' : 'Naya Jobb Okay'}},{new:true})
            .then((pp)=>{
            expect(pp.JobName).toEqual('Naya Jobb Okay')
            })
            
        }); 

        it('delete application', async () => {
        
            const status = await Application.deleteOne({_id:id});
            expect(status.ok).toBe(1);
        })

})