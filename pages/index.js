import {
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Campaign from "../components/campaign";
import Create from "../components/create";
import Headless from "../components/headless";

export default function Home({ children }) {
  return (
    <Headless>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card className="bg-dark campaignCard">
            <Card.Header><h4>The Game Master's Companion</h4></Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroupItem className="bg-dark">
                  <Create />
                </ListGroupItem>
                <ListGroupItem className="bg-dark">
                  <Campaign />
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
            <Card.Footer>&copy;2022 by Matthew Martin</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Headless>
  );
}
