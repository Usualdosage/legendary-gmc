import Layout from "../components/layout";
import { Card, Row, Col } from "react-bootstrap";
import Map from "../components/map";
import Alarms from "../components/alarms";

export default function Home() {
    return (
        <Layout>
            <Alarms />
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Card className="bg-dark">
                        <Card.Header>Select Map</Card.Header>
                        <Card.Body>
                            <Map></Map>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}
