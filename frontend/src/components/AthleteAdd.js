import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';


function AthleteAdd({ postAthletes }) {
    //const { postAthletes } = props

    const [athleteID, setAthleteID] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [style, setStyle] = useState('')
    const [pref, setPref] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const athlete = { athleteID, first_name, last_name, style, pref }
        if (style) {
            postAthletes(athlete)
        } else {
            alert('One or more properties are missing')
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="athleteID"
                    label="Athlete ID"
                    className="mb-3"
                    onChange={(e) => { setAthleteID(e.target.value) }}
                >
                    <Form.Control type="number" placeholder="Athlete ID" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="firstName"
                    label="First Name"
                    className="mb-3"
                    onChange={(e) => { setFirst_name(e.target.value) }}
                >
                    <Form.Control type="text" placeholder="First Name" required />
                </FloatingLabel>
                <FloatingLabel
                    controlId="lastName"
                    label="Last Name"
                    className="mb-3"
                    onChange={(e) => { setLast_name(e.target.value) }}
                >
                    <Form.Control type="text" placeholder="Last Name" required />
                </FloatingLabel>
                <FloatingLabel
                    controlId="style"
                    label="Swimming Style"
                    className="mb-3"
                    onChange={(e) => { setStyle(e.target.value) }}
                >
                    <Form.Select aria-label="Floating label select example">
                        <option value=''>Select a swimming style...</option>
                        <option value="Backstroke">Backstroke</option>
                        <option value="Freestyle">Freestyle</option>
                        <option value="Breaststroke">Breaststroke</option>
                        <option value="Butterfly">Butterfly</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    controlId="pref"
                    label="Lesson Preference "
                    className="mb-3"
                    onChange={(e) => { setPref(e.target.value) }}
                >
                    <Form.Select aria-label="Floating label select example">
                        <option value="None">None</option>
                        <option value="PrivateOnly">Private only</option>
                        <option value="GroupOnly">Group only</option>
                        <option value="Group">Prefer Group</option>
                        <option value="Private">Prefer Private</option>
                    </Form.Select>
                </FloatingLabel>
                <Form.Group as={Row} className="mb-3">
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" size="lg" type="submit">Submit</Button>
                    </div>
                </Form.Group>
            </Form>

        </ >
    )
}

export default AthleteAdd
