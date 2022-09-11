import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import axios from 'axios'

// Components
import AthleteAdd from '../components/AthleteAdd';
import AthleteFileUpload from '../components/AthleteFileUpload';
import AthleteList from '../components/AthleteList';

// API URL
const url = `http://localhost:5000/api/athletes`


function AthletePage() {
    // Hooks
    const [athletes, setAthletes] = useState([])
    const [fileUploadMessage, setFileUploadMessage] = useState('');

    // POST
    const postAthletes = async (singleAthlete) => {
        try {
            const res = await axios.post(url, { ...singleAthlete })
            console.log(...singleAthlete);
            getAthletes()
            //console.log(res.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    const postAthletesFile = async (jsonArray) => {
        //console.log('from page', jsonArray);
        try {
            const res = await axios.post(`${url}/upload`, { jsonArray })
            setFileUploadMessage('File Uploaded Successfully');
            //console.log(res);
            getAthletes()
        } catch (error) {
            console.log(error);
            if (error.response.status == 500) {
                setFileUploadMessage('There was a problem with the server');
            } else {
                setFileUploadMessage(error.response.data.msg);
            }
        }
    }
    // DELETE
    const deleteAthlete = async (athleteID) => {
        try {
            const res = await axios.delete(`${url}/${athleteID}`);
            getAthletes()
        } catch (error) {
            console.log(error.message, error.response);
        }
    }
    // GET
    const getAthletes = async () => {
        try {
            const res = await axios(`${url}`)
            console.log(`${res.statusText} status:${res.status} - Got ${res.data.athlete.length} elements from DB`);
            setAthletes(res.data.athlete)
        } catch (error) {
            console.log(error.message, error.response);
        }
    }
    useEffect(() => {
        getAthletes();
    }, [])
    return (
        <>
            <div className="d-flex justify-content-center">
                <h1  >Athletes</h1>
            </div>
            <div className="container-sm shadow-lg p-3 mb-5 bg-white rounded">
                <Tabs
                    defaultActiveKey="addOne"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill>
                    <Tab eventKey="addOne" title="Add Athlete">
                        <AthleteAdd postAthletes={athlete => postAthletes(athlete)} />
                    </Tab>
                    <Tab eventKey="addList" title="Upload Athlete List">
                        <AthleteFileUpload
                            uploadMessage={fileUploadMessage}
                            setUploadMessage={newMessege => setFileUploadMessage(newMessege)}
                            postAthletesFile={jsonArray => postAthletesFile(jsonArray)} />
                    </Tab>
                </Tabs>
            </div>
            <Container className="container-sm shadow-lg bg-white rounded pt-3 pb-3">
                <AthleteList
                    athletesList={athletes}
                    deleteAthlete={athleteID => deleteAthlete(athleteID)} />
            </Container >
        </>
    )
}
export default AthletePage