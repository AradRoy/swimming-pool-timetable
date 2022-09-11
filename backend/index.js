import app from './server.js'
import dotenv from "dotenv"
dotenv.config()
import connectDB from './db/connect-db.js'




const port = process.env.PORT || 8000

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      )
    } catch (error) {
      console.log(error)
    }
    //console.log(typeof process.env.MONGO_URI);
    //console.log(process.env.MONGO_URI);
  }
  
  start()