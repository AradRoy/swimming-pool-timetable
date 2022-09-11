import connectDB from './db/connect-db.js'
import dotenv from "dotenv"
dotenv.config()
import Coach from './models/coach.model.js'
import coathesData from './db/data.coaches.json' assert{type: 'json'}

//connect to db, empty the db!!, create method (works tor single or array), exit the procces once finnished

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to DB..')
        await Coach.deleteMany()
        console.log('deleted existing DB')
        await Coach.create(coathesData)
        console.log('NEW DB CREATED')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()