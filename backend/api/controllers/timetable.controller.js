import { Athlete } from "../../db/models/athlete.model.js";
import Lesson from "../../db/models/lesson.model.js";
import Coach from "../../db/models/coach.model.js";

// Globals
const maxInLesson = 10;
const simultaneousLessons = 1;

// Get athletes from db
const getAllAthletes = async (jsonFilter) => {
  try {
    const athleteList = await Athlete.find(jsonFilter);
    return athleteList;
  } catch (error) {
    console.log(error);
  }
};

// Get all coaches from db
const getAllCoaches = async () => {
  try {
    const coachArray = await Coach.find({});
    //console.log('Got coachArray:');
    /* for (const coach of coachArray) {
            console.log(coach.first_name);
        } */
    return coachArray;
  } catch (error) {
    console.log(error);
  }
};

const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateAthlete = async (athleteArray) => {
  for (const athlete of athleteArray) {
    try {
      const res = await Athlete.findOneAndUpdate(
        { _id: athlete._id },
        { solved: "true" },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!athlete) {
        return res
          .status(404)
          .json({ msg: `No athlete with id : ${athlete._id}` });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
const updateCoaches = async (coachArray) => {
  for (const coach of coachArray) {
    try {
      const res = await Coach.findOneAndUpdate(
        { _id: coach._id },
        { lessons: coach.lessons },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!coach) {
        return res
          .status(404)
          .json({ msg: `No athlete with id : ${coach._id}` });
      }
      //console.log(res.shift_name, res.shift_start.toISOString())
    } catch (error) {
      console.log(error);
    }
  }
};
const saveLessons = async (lessonArray) => {
  try {
    await Lesson.deleteMany();
    const lessons = await Lesson.create(lessonArray);
    return lessons;
  } catch (error) {
    console.log(error);
  }
};
const createLesson = () => {
  const lesson = {
    coach: "",
    style: "",
    lesson_type: "",
    start_time: "",
    end_time: "",
    duration: "",
    attendies: 0,
    athletes: [],
    athlete_names: [],
  };
  return lesson;
};
const populateLesson = (athlete, lesson, lesson_type) => {
  // lesson uppdates
  if (!lesson.style) {
    lesson.style = athlete.style;
    lesson.lesson_type = lesson_type;
    lesson.duration = lesson_type === "Group" ? 60 : 45;
  }
  lesson.attendies++;
  lesson.athletes.push(athlete);
  lesson.athlete_names.push(`${athlete.first_name} ${athlete.last_name}`);
  return lesson;
};

const createTimeTable = async (req, res) => {
  // level One //
  /*  in this level all the athletes are devided in to arbitrary lessons
        accordint to swimming style and lesson type
    */
  //
  // pool data from DB and create empty time slots for lessons (max= num of athletes)
  const athleteArray = await getAllAthletes();
  if (athleteArray.length === 0) {
    return res.status(400).json("Athlete list is empty");
  }
  const coachArray = await getAllCoaches();
  if (athleteArray.length === 0) {
    return res.status(400).json("Coach list is empty");
  }
  const lessonArray = [createLesson()];

  // iterate over the athletes that preffers groups first
  for (const athlete of athleteArray) {
    if (athlete.pref.match(/(None)|(Group)|(Group only)/gi)) {
      athlete.solved = false;
      for (let lesson of lessonArray) {
        if (
          lesson.attendies < maxInLesson &&
          athlete.style == lesson.style &&
          lesson.lesson_type != "Private"
        ) {
          // lesson uppdates
          lesson = populateLesson(athlete, lesson, "Group");
          // athlete updates
          athlete.solved = true;
          break;
        }
      }
      if (!athlete.solved) {
        // lesson uppdates
        let newLesson = createLesson();
        lessonArray.push(populateLesson(athlete, newLesson, "Group"));
        //athlete updates
        athlete.solved = true;
      }
    }
  }
  // iterate over the athletes that preffers private
  for (const athlete of athleteArray) {
    if (athlete.pref.match(/(Private)|(Private only)/gi)) {
      athlete.solved = false;
      for (let lesson of lessonArray) {
        if (!lesson.attendies) {
          // lesson uppdates
          lesson = populateLesson(athlete, lesson, "Private");
          // athlete updates
          athlete.solved = true;
          break;
        }
      }
      if (!athlete.solved) {
        // lesson uppdates
        let newLesson = createLesson();
        lessonArray.push(populateLesson(athlete, newLesson, "Private"));
        //athlete updates
        athlete.solved = true;
      }
    }
  }
  // level Two //
  /* 
        In this level of the algorithim each lesson is related to work shift of one coach
        based on knapsack algoritim
    */
  let unsolvedAthletes = [];
  const timeArray = [];
  for (const lesson of lessonArray) {
    lesson.solved = false;



    // find the best coach that can accommodate the current lesson
    let max = -1
    let index = 0
    for (const coach of coachArray) {
      if (coach.lessonsInShift < 1) {
        coach.remShift = (coach.shift_end - coach.shift_start) / 1000 / 60;
      }


      if (
        coach.remShift >= lesson.duration && coach.remShift - lesson.duration > max &&
        coach.style.includes(lesson.style)
      ) /* {
        index = coach._id
        max = coach.remShift - lesson.duration
      } */ {
        //update lesson
        lesson.coach = coach.first_name;
        lesson.title = `${lesson.lesson_type} ${lesson.style} with ${lesson.coach}`;
        lesson.start_time = new Date(coach.shift_start);
        lesson.end_time = new Date(lesson.start_time);
        lesson.end_time.setTime(
          lesson.end_time.getTime() + lesson.duration * 60 * 1000
        );
        lesson.solved = true;
        //update coach
        coach.remShift -= lesson.duration;
        coach.shift_start = lesson.end_time;
        // time array

        break;
      }
    }
    if (!lesson.solved) {
      for (const athlete of lesson.athletes) {
        athlete.solved = false;
        unsolvedAthletes.push(athlete);
      }
    }
  }

  res
    .status(200)
    .json({ lessons: lessonArray, unsolvedAthletes: unsolvedAthletes });
  const athleteRes = await updateAthlete(athleteArray);
  const coachRes = await updateCoaches(coachArray);
  const lessonRes = await saveLessons(lessonArray);
  //console.log(lessonArray);
};

export { getAllLessons, createTimeTable };
//
