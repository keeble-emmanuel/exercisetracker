const mongoose = require('mongoose');
const Schema  = mongoose.Schema;



mongoose.connect('mongodb+srv://keeble:140076812keeble@cluster0.it6ej.mongodb.net/');

// schema for username and id
const userandId =  new Schema({
    name: String
})
const UserId = mongoose.model('UserandId', userandId)


//schema for exercise
const exerciseSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref : 'UserId'
    },
    description: String,
    duration: Number,
    date: String,
    nameofid: String
})
const ExerciseModel = mongoose.model('Exercisemodel', exerciseSchema)

const saveEx = async(a, b, c, d, e)=>{
    const exadd = new ExerciseModel({
        user_id : a,
        description: b,
        duration: c,
        date: d,
        nameofid: e
    })
    const savex = await exadd.save()
    return savex
}
const createExercise = async (req, res)=>{
    const data = req.body;
    if (data.date == ''){
        data.date = new Date().toDateString()
    }else{
        data.date = new Date(data.date).toDateString()
    }
    
    const par = req.params
    const mong = await UserId.findById(par)
    if(mong){
        const savedata = await saveEx(mong._id, data.description, data.duration, data.date, mong.name)
        console.log(savedata)
        res.json({
            _id: mong._id,
            description: savedata.description,
            duration: savedata.duration,
            date: savedata.date,
            username: savedata.nameofid
        })
    }else{
        res.send('user not found')
    }
    
    //console.log(data.date, data, _id)
}
const createUserdb = async(username)=>{
    const adduser = new UserId({
        name: username
    })
    const savre = await adduser.save();
    return savre
    
}
const findAllUsers = (req, res)=>{
    UserId.find()
    .then((data)=> {
        const newarray= []
        data.forEach((el)=>{
            const newObj = {username: el.name, _id:el._id}
            newarray.push(newObj);
           // console.log(newarray)
           
        })
        res.send(newarray)
    })
    .catch((err)=>console.error(err))
}

const createUser = async(req, res)=>{
    const { username } =req.body
    const rnuber = Math.random()*200
    
    const savre = await createUserdb(username)
    const { name, _id } =savre
    res.json({
        username: name,
        _id: _id
    })
    
    

}

const getAllLogs = async(req, res)=>{
    const _id = req.params;
    let count = 1;
    console.log(_id._id);
    const cout = await ExerciseModel.countDocuments({user_id: _id._id})
    const search = await ExerciseModel.find({user_id: _id._id})
    const logs = [];
    search.forEach((el)=>{
        newObj = {
            description: el.description,
            duration: el.duration,
            date: el.date
        }
        logs.push(newObj)
    })
    console.log( cout, search)
    res.json({
       
        username: search[0].nameofid,
        id: search[0].user_id,
        count : cout,
        log: logs
    })
}
module.exports = {
    createUser,
    getAllLogs,
    findAllUsers,
    createExercise
    
}
