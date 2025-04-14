const mongoose = require('mongoose');
const Schema  = mongoose.Schema;



//mongoose.connect('mongodb+srv://keeble:140076812keeble@cluster0.it6ej.mongodb.net/');

// schema for username and id
const userandId =  new Schema({
    name: String
})
const UserId = mongoose.model('UserId', userandId)


//schema for exercise
const exerciseSchema = new Schema({
    id: Number,
    description: String,
    duration: Number,
    date: Date,
})
const exerciseModel = mongoose.model('Exercisemodel', exerciseSchema)

const createExercise = ()=>{

}
const createUserdb = (username)=>{
    const adduser = new UserId({
        name: username
    })
    adduser.save
}
const findUser = (id)=>{
    UserId.findById(id, (err, data)=>{
        if (err){
            console.log('not found user')
        }else{

        }
    })
}

const createUser = (req, res)=>{
    const username =req.body
    console.log(username)
    //createUserdb(username)

}

const getUser = (req, res)=>{
    const {
        id,
        exercise,
        duration,
        date
    } = req.body
    UserId.findById(id, (err, data)=>{
        if (err){
            console.log('not found user')
            res.send('user not available')
        }else{
            console.log('found user')
        }
    })


}
module.exports = {
    createUser,
    getUser
}