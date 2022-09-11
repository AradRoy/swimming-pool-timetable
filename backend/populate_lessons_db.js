import connectDB from './db/connect-db.js'
import dotenv from "dotenv"
dotenv.config()
import {Lesson} from './models/lesson.model.js'
import lessonData from './db/data.lessons.json' assert{type: 'json'}


//connect to db, empty the db!!, create method (works tor single or array), exit the procces once finnished

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Lesson.deleteMany()
        await Lesson.create(lessonData)
        console.log('Connected to DB!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    //console.log(typeof lessonData);
}

start()