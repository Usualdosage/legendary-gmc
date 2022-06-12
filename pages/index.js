import {
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import Campaign from "../components/campaign";
import Create from "../components/create";
import Load from "../components/load"
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
                <ListGroupItem className="bg-dark">
                  <Load />
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
            <Card.Footer>&copy;2022 by Matthew Martin. <a href="https://www.github.com/usualdosage/legendary-gmc">Source Code</a></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Headless>
  );
}
