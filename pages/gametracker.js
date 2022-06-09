import Layout from "../components/layout";
import Alarms from "../components/alarms";
import Time from "../components/time";
import Weather from "../components/weather";
import Needs from "../components/needs";
import Players from "../components/players";
import Monsters from "../components/monsters";
import { Row, Col } from "react-bootstrap";

export default function Home() {
    return (
        <Layout>
            <Alarms />
            <Row>
                <Col md={4}>
                    <Time />
                </Col>
                <Col md={4}>
                    <Weather />
                </Col>
                <Col md={4}>
                    <Needs />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <br />
                    <Players />
                </Col>
                <Col md={6}>
                    <br />
                    <Monsters />
                </Col>
            </Row>
        </Layout>
    );
}
