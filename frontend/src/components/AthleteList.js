import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';


import axios from 'axios'



function AthleteList({ deleteAthlete, athletesList }) {
    //const { deleteAthlete, athletesList } = props
    return (
        <>
            <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="0" >
                    <Accordion.Header >
                        <h3>Registered Athletes: {athletesList.length} </h3>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped bordered hover responsive="md">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Swimming Style</th>
                                    <th>Preffered Lesson</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {athletesList.map((athlete) => {
                                    const { athleteID, first_name, last_name, pref, style } = athlete
                                    return (
                                        <tr key={athlete._id}>
                                            <td>{athleteID}</td>
                                            <td>{first_name}</td>
                                            <td>{last_name}</td>
                                            <td>{pref}</td>
                                            <td>{style}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteAthlete(athleteID)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}



export default AthleteList