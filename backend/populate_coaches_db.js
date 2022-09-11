import connectDB from "./db/connect-db.js";
import dotenv from "dotenv";
dotenv.config();
import Coach from "./db/models/coach.model.js";
import coathesData from "./db/sample_data/data.coaches.json" assert { type: "json" };

//connect to db, empty the db!!, create method (works tor single or array), exit the procces once finnished

const updateDates = (coathesData) => {
  for (let coach of coathesData) {
    let startTime = new Date(coach.shift_start);
    let endTime = new Date(coach.shift_end);
    //const month =
    const day = startTime.toLocaleDateString("en-IL", { weekday: "short" });
    //startTime = startTime.getUTCHours();
    //endTime = endTime.getUTCHours();
    //coach.shift_start = new Date(2022);
    console.log(startTime.toLocaleString());
  }
  return coathesData;
};

const start = async () => {
  /* const list = updateDates(coathesData);
  //console.log(list); */
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB..");
    await Coach.deleteMany();
    console.log("deleted existing DB");
    await Coach.create(coathesData);
    console.log("NEW DB CREATED");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
