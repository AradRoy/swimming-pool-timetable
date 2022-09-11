import express from 'express'
const router = express.Router()
import { getAllAthletes, getAthlete, createAthlete, createAthleteFromFile, deleteAthlete } from '../controllers/athlete.controller.js'


//athletes main page
router.route('/').get(getAllAthletes).post(createAthlete)
router.route('/:id').get(getAthlete).delete(deleteAthlete)
router.route('/upload').post(createAthleteFromFile)




export default router