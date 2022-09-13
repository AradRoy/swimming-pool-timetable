import { Athlete } from "../../db/models/athlete.model.js";
import Lesson from "../../db/models/lesson.model.js";
import Coach from "../../db/models/coach.model.js";

// Globals
const maxInLesson = 2;

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
    solved: false,
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
  lesson.athlete_names.push(`${athlete.first_name} ${athlete.last_name}`);
  lesson.athletes.push(athlete);
  //console.log('start', athlete.first_name, 'end');
  return lesson;
};
const compareAthletes = (a, b) => {

  if (a.pref.match(/(None)|(Group)|(Group only)/gi) && b.pref.match(/(Private)|(Private only)/gi)) {
    //a = group
    //b = private -> a before b
    return -1
  }
  if (a.pref.match(/(Private)|(Private only)/gi) && b.pref.match(/(None)|(Group)|(Group only)/gi)) {
    //a = private
    //b = group -> b before a
    return 1
  }
  if (a.pref.match(/(Group only)/gi) && b.pref.match(/(None)|(Group)/gi)) {
    //a = group only
    //b = else -> a before b
    return -1
  }
  if (a.pref.match(/(None)|(Group)/gi) && b.pref.match(/(Group only)/gi)) {
    //a = else 
    //b = group only-> b before a
    return 1
  }
  if (a.pref.match(/(Group)/gi) && b.pref.match(/(None)/gi)) {
    //a = group only
    //b = else -> a before b
    return -1
  }
  if (a.pref.match(/(None)/gi) && b.pref.match(/(Group)/gi)) {
    //a = else 
    //b = group only-> b before a
    return 1
  }
  // keep the same
  return 0
}
const findCoachTime = (lesson, coachArray, unsolvedAthletes, solvedLessons, timeSlots) => {

  // find the best coach that can accommodate the current lesson
  let max = -1
  for (const coach of coachArray) {
    if (coach.lessonsInShift < 1) {
      coach.remShift = (coach.shift_end - coach.shift_start) / 1000 / 60;
    }
    if (
      coach.remShift >= lesson.duration &&
      coach.remShift - lesson.duration > max &&
      coach.style.includes(lesson.style) &&
      (timeSlots[coach.day] == 0 ||
        timeSlots[coach.day][timeSlots[coach.day].length - 1][1].getTime() <= coach.shift_start.getTime())
    ) {
      // update lesson
      lesson.coach = coach.first_name;
      lesson.title = `${lesson.lesson_type} ${lesson.style} with ${lesson.coach}`;
      lesson.start_time = new Date(coach.shift_start);
      lesson.end_time = new Date(lesson.start_time);
      lesson.end_time.setTime(
        lesson.end_time.getTime() + lesson.duration * 60 * 1000
      );
      lesson.solved = true;
      solvedLessons.push(lesson)
      // update coach
      coach.remShift -= lesson.duration;
      coach.shift_start = lesson.end_time;
      // update time slots
      const s = new Date(lesson.start_time)
      const e = new Date(lesson.end_time)
      timeSlots[coach.day].push([s, e])
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

const createTimeTable = async (req, res) => {
  /*  
  // level One //
    in this level all the athletes are devided in to lessons
    accordint to swimming style and lesson type
  // level Two // 
    In this level of the algorithim each lesson is related to work shift of one coach
    based on greedy knapsack algoritim - next worst        
  */



  // pool data from DB and create empty time slots for lessons (max= num of athletes)
  let athleteArray = await getAllAthletes();
  //(athleteArray.length === 0) && (res.status(400).json("Athlete list is empty"))
  if (athleteArray.length === 0) {
    return res.status(400).json("Athlete list is empty");
  }
  for (const athlete of athleteArray) {
    athlete.solved = false
  }
  const coachArray = await getAllCoaches();
  if (coachArray.length === 0) {
    return res.status(400).json("Coach list is empty");
  }
  // initializations
  const lessonArray = [];
  let unsolvedAthletes = [];
  let solvedLessons = [];
  const timeSlots = [[], [], [], [], []]
  //console.table(timeSlots)
  /* 
  ┌─────────┬────┐
  │ (index) │ 0  │
  ├─────────┼────┤
  │    0    │ [] │
  │    1    │ [] │
  │    2    │ [] │
  │    3    │ [] │
  │    4    │ [] │
  └─────────┴────┘
  */

  // Sort athletes
  athleteArray.sort(compareAthletes)

  // iterate over the athletes
  for (let i = 0; i < athleteArray.length; i++) {
    const athlete = athleteArray[i];
    if (athlete.solved === false) {
      // IF private
      if (athlete.pref.match(/(Private)|(Private only)/gi)) {
        let lesson = createLesson()
        const last = lessonArray.push(populateLesson(athlete, lesson, "Private"));
        //athlete updates
        athlete.solved = true;
        findCoachTime(lessonArray[last - 1], coachArray, unsolvedAthletes, solvedLessons, timeSlots)
      } else {
        for (let lesson of lessonArray) {
          if (
            lesson.attendies < maxInLesson &&
            athlete.style == lesson.style &&
            lesson.lesson_type != "Private"
          ) {
            lesson = populateLesson(athlete, lesson, "Group");// lesson uppdates
            athlete.solved = true;// athlete updates
            break;
          }
        }
        if (!athlete.solved) {
          let newLesson = createLesson();// lesson uppdates
          const last = lessonArray.push(populateLesson(athlete, newLesson, "Group"));
          athlete.solved = true;// athlete updates
          findCoachTime(lessonArray[last - 1], coachArray, unsolvedAthletes, solvedLessons, timeSlots)
        }
      }
    }
  }

  // sort lessons by value$ i.e by number of athletes decending
  //lessonArray.sort((a, b) => b.athletes.length - a.athletes.length)
  res
    .status(200)
    .json({ lessons: solvedLessons, unsolvedAthletes: unsolvedAthletes });
  const athleteRes = await updateAthlete(athleteArray);
  const coachRes = await updateCoaches(coachArray);
  const lessonRes = await saveLessons(solvedLessons);

};

export { getAllLessons, createTimeTable };

