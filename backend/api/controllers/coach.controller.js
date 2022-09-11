import Coach from '../../models/coach.model.js'
import fs from 'fs'
//import randomData from '../../db/random_data.json'
const jsonPath='./db/random_data.json'
import { json } from 'express'
import asyncWrapper from './async.wrapper.js'

//const <controller> = asyncWrapper( async(req,res,<optional-next>) => {actions} )

/* const getAllAthletes = asyncWrapper(async(req,res)=>{
    const athlete = await Athlete.find({})
    res.status(200).json({athlete})
}) */
const getAllAthletes = async(req,res)=>{
    const athlete = await Athlete.find({first_name:/Br/i})
    console.log(athlete);
    res.status(200).json({athlete})
}
// create a single athlete manually
const createAthlete = asyncWrapper(async(req,res)=>{
    const athlete = await Athlete.create(req.body)
    res.status(201).json({athlete})
})
// create multilpule athletes automatically from JSON created from https://generatedata.com/generator
const uploadAthletesFile = asyncWrapper(async(req,res)=>{
    fs.readFile(jsonPath, 'utf-8', (err, jsonString)=>{
        console.log(JSON.parse(jsonString)[0])
        const athlete = Athlete.create(JSON.stringify(element))
        res.json({athlete})
    })
})

const deleteAthlete = asyncWrapper(async(req,res, next)=>{
    const {athleteID: athleteID} = req.params
    const athlete = await Athlete.findOneAndDelete({athleteID: athleteID})
    if(!athlete){
        return res.status(404).json({msg: `No athlete with id : ${taskID}`})
    }
    res.status(200).json({ task })
})

export {
    getAllAthletes, 
    createAthlete,
    uploadAthletesFile,
    deleteAthlete
}
