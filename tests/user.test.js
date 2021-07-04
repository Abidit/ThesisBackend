// path and mongoose model

const User = require('../models/userModel');
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

describe("User Schema Test", () =>{

    var id;
   //insert testing
    it('Add user', () => {
        const user ={
            'Fullname' : 'Nabin Kutu',
            'Email' : "nabin@gmail.com",
            'Username' : "nabinn",
            'Usertype' : 'Applicant',
            'Password' : 'nabinn'
        } ;
        return User.create(user)
        .then((res) => {
            id = res._id
            expect(res.Fullname).toEqual('Nabin Kutu');
        })
    })
    

    it('update User', async () => {
        return User.findOneAndUpdate({_id :id}, 
       {$set : {Fullname:'ram'}},
       {
           new:true
       })
        .then((pp)=>{
        expect(pp.Fullname).toEqual('ram')
        })
        
       });
       
    it('login user', async () => {
        const data ={
                     'Username' : 'nabinn',
                     'Password' : 'nabinn'
                }
        return User.findOne({data});
        expect(status.ok).toBe(1);
        })
       
    it('delete user', async () => {
        
        const status = await User.deleteOne({_id:id});
        expect(status.ok).toBe(1);
    })
});