import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

function LessonsList(props) {
  const lessons = props.lessonArray;
  return (
    <Row xs={1} md={3} lg={5} className="g-4">
      {lessons.map((lesson) => {
        const { lesson_type, style, title, athlete_names, coach } = lesson;
        return (
          <Col>
            <Card>
              <Card.Img variant="top" src={`/img/${style}.png`} />
              <Card.Body>
                <Card.Title>{`${lesson_type} - ${style}`}</Card.Title>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item variant="secondary">{`Coach: ${coach}`}</ListGroup.Item>
                    {athlete_names.map((name) => {
                      return <ListGroup.Item>{name}</ListGroup.Item>;
                    })}
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default LessonsList;
