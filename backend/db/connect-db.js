import mongoose from 'mongoose'


const connectDB = (url) => {
    return mongoose
    .connect(url, {
      useNewUrlParser: true,
      maxPoolSize: 50,
      wtimeoutMS: 250,
    })
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    
  }
  
  export default connectDB