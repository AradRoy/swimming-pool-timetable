import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { parse } from 'papaparse';
import axios from 'axios'


function AthleteFileUpload({ postAthletesFile, uploadMessage, setUploadMessage }) {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('No file chosen')
    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        const fileText = await file.text()
        let jsonArray
        if (file.type == 'text/csv') {
            jsonArray = JSON.stringify(parse(fileText, { header: true, dynamicTyping: true }).data)
        } else {
            jsonArray = fileText
        }
        postAthletesFile(jsonArray)
    }

    return (
        <div>
            {uploadMessage ?
                <Alert className='fade ' variant="info" dismissible onClose={() => setUploadMessage('')}>
                    {uploadMessage}
                </Alert > : null
            }
            < form onSubmit={onSubmit}>
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Select a file containing athlets data</Form.Label>
                    <Form.Control type="file" size="lg" onChange={onChange} required accept=".csv,.json" />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" size="lg" type="submit">Submit</Button>
                    </div>
                </Form.Group>
            </form>
        </div>
    )
}

export default AthleteFileUpload;
/* 

            */