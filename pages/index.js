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
                  This application is designed for use with the <a target="_blank" href="https://www.amazon.com/dp/1794769862/ref=cm_sw_em_r_mt_dp_GBH554RBEQATJB0B0MRY">Legendary</a> tabletop roleplaying game system.
                  </ListGroupItem>
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
