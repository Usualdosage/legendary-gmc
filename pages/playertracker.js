import Layout from "../components/layout";
import Alarms from "../components/alarms";
import PlayerDetail from "../components/playerdetail";
import { Col, Row } from "react-bootstrap";

export default function Home() {
    return (
        <Layout>
            <Alarms />
            <br />
            <Row>
                <Col md={6}>
                    <PlayerDetail id="0" />
                </Col>
                <Col md={6}>
                    <PlayerDetail id="1" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <PlayerDetail id="2" />
                </Col>
                <Col md={6}>
                    <PlayerDetail id="3" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <PlayerDetail id="4" />
                </Col>
                <Col md={6}>
                    <PlayerDetail id="5" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <PlayerDetail id="6" />
                </Col>
                <Col md={6}>
                    <PlayerDetail id="7" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <PlayerDetail id="8" />
                </Col>
                <Col md={6}>
                    <PlayerDetail id="9" />
                </Col>
            </Row>
        </Layout>
    );
}
