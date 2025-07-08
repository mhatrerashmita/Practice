const mongoose = require('mongoose')

const MongoConnection = 'mongodb://localhost:27017/new_books'

export const Mongodb = async () =>{
    try {
        await mongoose.connect(MongoConnection);
        console.log("connect bahi!!!!!!")
    }catch(error){
        console.log("not connect",error)
        process.exit(1)
    }
}