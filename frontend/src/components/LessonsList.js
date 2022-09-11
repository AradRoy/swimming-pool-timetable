import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function LessonsList(props) {
    const lessons = props.lessonArray
    return (
        <Row xs={1} md={3} lg={5} className="g-4">
            {lessons.map((lesson) => {
                const { style, title, athletes } = lesson
                return (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={`/img/${style}.png`} />
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>
                                    {athletes.join(' , ')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row >
    );
}

export default LessonsList;