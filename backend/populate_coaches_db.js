import connectDB from "./db/connect-db.js";
import dotenv from "dotenv";
dotenv.config();
import Coach from "./db/models/coach.model.js";
import coathesData from "./db/sample_data/data.coaches.json" assert { type: "json" };

//connect to db, empty the db!!, create method (works tor single or array), exit the procces once finnished


const insertDate = (dateToSet, day, hours) => {
  dateToSet = new Date()
  let currentDay = dateToSet.getDay()
  let dif = (day - currentDay)
  dateToSet.setDate(dateToSet.getDate() + dif)
  dateToSet.setHours(hours, 0, 0, 0)

  return dateToSet
}

const updateDates = (coathesData) => {
  for (let coach of coathesData) {
    let { day, startTime, endTime, first_name } = coach
    coach.shift_start = insertDate(coach.shift_start, day, startTime)
    coach.shift_end = insertDate(coach.shift_end, day, endTime)
    /*  console.log(`${first_name}: `,
       shift_start.toLocaleDateString('en-US', { weekday: 'short' }),
       `from `, shift_start.toLocaleTimeString('en-US'),
       `to `, shift_end.toLocaleTimeString('en-US')) */

  }
  console.log(coathesData);
  return coathesData;
};
const start = async () => {
  const retCoathesData = updateDates(coathesData);
  //console.log(retCoathesData);
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB..");
    await Coach.deleteMany();
    console.log("deleted existing DB");
    await Coach.create(retCoathesData);
    console.log("NEW DB CREATED");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
