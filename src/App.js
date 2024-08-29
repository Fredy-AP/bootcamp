import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/codingresources/codingResources');
        setResources(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
      <p className="mt-3">Loading...</p>
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">Error: {error}</Alert>
    </Container>
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Coding Resources</h1>
      <Row>
        {resources.map((resource, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
