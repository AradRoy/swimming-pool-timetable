import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Timetable from "../components/Timetable";
import LessonsList from "../components/LessonsList";

const TimetablePage = () => {
  const [lessons, setLessons] = useState();
  const [athletes, setAthletes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [num, setNum] = useState(1);

  // GET lessons
  const getLessons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/timetable");
      console.log("good", res.data.lessons);
      setLoaded(true);
      setLessons(res.data.lessons);
    } catch (error) {
      console.log(error.message, error.response.data);
      setLoaded(true);
      setError(error.response.data);
    }
  };
  // GET athletes
  const getAthletes = async () => {
    try {
      const res = await axios(`http://localhost:5000/api/athletes`);
      console.log(
        `${res.statusText} status:${res.status} - Got ${res.data.athlete.length} elements from DB`
      );
      setAthletes(res.data.athlete);
    } catch (error) {
      console.log(error.message, error.response);
    }
  };
  useEffect(() => {
    getLessons();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Weekly Timetable</h1>
      </div>
      {!loaded && (
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-center"
        >
          <Spinner animation="grow" variant="primary" />
          <h3>Calculating..{num}</h3>
        </Stack>
      )}
      {loaded && error && (
        <Alert key="danger" variant="danger">
          <Alert.Heading>Oops {error}</Alert.Heading>
        </Alert>
      )}

      {loaded && !error && (
        <Tabs
          defaultActiveKey="calendar"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="calendar" title="Calendr View">
            <Timetable lessonArray={lessons} />
          </Tab>
          <Tab eventKey="list" title="Lesson List">
            <LessonsList lessonArray={lessons} />
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default TimetablePage;
