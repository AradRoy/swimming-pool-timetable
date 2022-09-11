
import Papa from 'papaparse';
import Athlete from '../../models/athlete.model.js'
import list from '../../db/sample_data/20atletes.json'assert { type: 'json' }
import { unlink, rename } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { assert } from 'node:console';
const __filename = fileURLToPath(import.meta.url);
const backendDir = path.dirname(path.dirname(path.dirname(__filename)))


// FIND all athletes
const getAllAthletes = async (req, res) => {
    try {
        const athlete = await Athlete.find({})
        //console.log(athlete);
        res.status(200).json({ athlete })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
// FIND one
const getAthlete = async (req, res) => {
    try {
        const athlete = await Athlete.find({ first_name: /Br/i })
        //console.log(athlete);
        res.status(200).json({ athlete })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
// CREATE a single athlete manually
const createAthlete = async (req, res) => {
    try {
        const athlete = await Athlete.create(req.body)
        res.status(201).json({ athlete })
    } catch (error) {
        res.status(500).json({ error })

    }
}
// DELETE the provided athlete
const deleteAthlete = async (req, res, next) => {
    try {
        const { id: athleteID } = req.params

        const athlete = await Athlete.findOneAndDelete({ athleteID: athleteID })
        if (!athlete) {
            return res.status(404).json({ msg: `No athlete with id : ${athleteID}` })
        }
        res.status(200).json({ athlete })
    } catch (error) {
        res.status(500).json({ msg: error })

    }
}
// CREATE multilpule athletes automatically from JSON created from https://generatedata.com/generator
const createAthleteFromFile = async (req, res) => {
    if (!req.body.jsonArray) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }
    const athletesData = JSON.parse(req.body.jsonArray)
    //console.log(athletesData);
    try {
        await Athlete.deleteMany()
        const athletes = await Athlete.create(athletesData)
        res.status(200).json({ msg: `${athletes.length} enteries recorded to DB` })
        //console.log("upload seucceed");
    } catch (error) {
        res.status(500).json(error)
    }
}
export {
    getAllAthletes,
    getAthlete,
    createAthlete,
    createAthleteFromFile,
    deleteAthlete
}
