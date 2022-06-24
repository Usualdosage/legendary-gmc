import Layout from "../components/layout";
import Timer from "../components/timer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alarms from "../components/alarms";
import { MAX_TIMERS } from "../components/const";

export default function Home() {
    let timers = [];
    for (let x = 0; x < MAX_TIMERS; x++) {
        timers.push(
            <Col xs={3} md={3} lg={3}>
                <Timer timerIndex={x} text="Start" />
            </Col>
        );
    }
    return (
        <Layout>
            <Alarms />
            <Row>{timers}</Row>
        </Layout>
    );
}
