import connectDB from './db/connect-db.js'
import dotenv from "dotenv"
dotenv.config()
import Athlete from './models/athlete.model.js'
import randomAthleteData from './db/sample_data/40athletes.json' assert{type: 'json'}

//connect to db, empty the db!!, create method (works tor single or array), exit the procces once finnished

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Athlete.deleteMany()
        await Athlete.create(randomAthleteData)
        console.log('Connected to DB!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    //console.log(typeof randomAthleteData);
}

start()