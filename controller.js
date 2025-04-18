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
    nameId: String,
    description: String,
    duration: Number,
    date: String,
})
const exerciseModel = mongoose.model('Exercisemodel', exerciseSchema)
const saveEx = async(a, b, c, d)=>{
    const exadd = new exerciseModel({
        nameId : a,
        description: b,
        duration: c,
        date: d
    })
    const savex = await exadd.save()
    return savex
}
const createExercise = async (req, res)=>{
    const data = req.body;
    let _id, duration, description, date;
    ({_id, description, duration, date}= data)
    _id = _id
    description = description
    duration = duration
    date =  date ? new Date(date).toDateString(): new Date().toDateString()
    console.log(description, date, req.body)
    UserId.find({_id: _id})
    .then(async(data)=>{
        const savex = await saveEx(_id, description, duration, date);
        console.log(savex)
    })
    
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
        const newArray = data.map(({ name, ...rest })=> rest)
        console.log(newArray)
        res.send(newArray)
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

const getAllLogs = (req, res)=>{
   const _id = req.params;
    console.log()

}
module.exports = {
    createUser,
    getAllLogs,
    findAllUsers,
    createExercise
    
}
