import express from 'express'
const router = express.Router()
import { createTimeTable, getAllLessons } from '../controllers/timetable.controller.js'

//timetable main page
router.route('/').get(createTimeTable)//.get(getAllLessons)


//ALSO CREATE THE CONTROLLERS FOR THOSE FUNCTIONS
export default router