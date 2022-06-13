import React, { Component } from "react";
import { Button, ButtonGroup, Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faCircleStop,
    faCirclePause,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import { MAX_TIMERS } from "../components/const";
import styles from "./timer.module.css";
import { Log } from "../components/logger";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.elapsedRef = React.createRef();
        this.playRef = React.createRef();
        this.pauseRef = React.createRef();
        this.elapsedHHRef = React.createRef();
        this.elapsedMMRef = React.createRef();
        this.elapsedSSRef = React.createRef();
    }

    componentDidMount() {
        this.getTimer();
    }

    initializeTimers = (timers) => {
        Log("Initializing timers...");

        if (timers === null) timers = [];

        for (let x = 0; x < MAX_TIMERS; x++) {
            timers.push({
                id: x,
                name: "Timer " + (x + 1),
                isStarted: false,
                value: 0,
                maxValue: 0, // Used for tracking elapsed time
            });
        }

        let campaign = loadActiveCampaign();
        campaign.timers = timers;
        saveActiveCampaign(campaign);

        return timers;
    };

    getTimer() {
        let campaign = loadActiveCampaign();

        if (campaign.timers != null) {
            let timer = campaign.timers[this.props.timerIndex];
            this.inputRef.current.value = timer.name;
            let totalSeconds = timer.value;
            const formatted = new Date(totalSeconds * 1000)
                .toISOString()
                .substr(11, 8);
            this.elapsedRef.current.innerText = formatted;

            this.elapsedHHRef.current.value = timer.hh;
            this.elapsedMMRef.current.value = timer.mm;
            this.elapsedSSRef.current.value = timer.ss;
            
            if (timer.isStarted) {
                this.toggleTimer(this.props.timerIndex, 0);
            }
        }
    }

    setElapsedValue() {
        var hh = this.elapsedHHRef.current.value || 0;
        var mm = this.elapsedMMRef.current.value || 0;
        var ss = this.elapsedSSRef.current.value || 0;

        var totalSeconds =
            parseInt(ss) + parseInt(mm) * 60 + parseInt(hh) * 60 * 60;

        let campaign = loadActiveCampaign();

        if (campaign.timers != null) {
            let timer = campaign.timers[this.props.timerIndex];
            timer.maxValue = totalSeconds;
            campaign.timers[this.props.timerIndex] = timer;
            saveActiveCampaign(campaign);
        }
    }

    setTimer() {
        let campaign = loadActiveCampaign();

        if (campaign.timers != null) {
            
            let timer = campaign.timers[this.props.timerIndex];

            var hh = this.elapsedHHRef.current.value || 0;
            var mm = this.elapsedMMRef.current.value || 0;
            var ss = this.elapsedSSRef.current.value || 0;

            timer.name = this.inputRef.current.value;
            timer.hh = hh;
            timer.mm = mm;
            timer.ss = ss;

            campaign.timers[this.props.timerIndex] = timer;
            saveActiveCampaign(campaign);
        }
    }

    formatTime = (seconds) => {
        let campaign = loadActiveCampaign();

        if (campaign.timers != null) {
            let timer = campaign.timers[this.props.timerIndex];
            timer.value = seconds;

            let totalSeconds = timer.value;
            const formatted = new Date(totalSeconds * 1000)
                .toISOString()
                .substr(11, 8);
            this.elapsedRef.current.innerText = formatted;
            campaign.timers[this.props.timerIndex] = timer;
            saveActiveCampaign(campaign);
        }
    };

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    toggleTimer = (timerNum, state) => {
        let campaign = loadActiveCampaign();

        if (campaign.timers == null) {
            campaign.timers = this.initializeTimers(campaign.timers);
        }

        let timer = campaign.timers[timerNum];

        // Set the name of the timer
        this.inputRef.current.value = timer.name;

        if (timer) {
            // Found
            switch (state) {
                case 0: // Start
                    timer.isStarted = true;
                    timer.interval = setInterval((evt) => {
                        timer.value = timer.value + 1;
                        this.formatTime(timer.value);
                    }, 1000);
                    this.playRef.current.className =
                        this.playRef.current.className + " disabled";
                    break;
                case 1: // Stop
                    clearInterval(timer.interval);
                    timer.isStarted = false;
                    timer.value = 0;
                    this.formatTime(0);
                    this.playRef.current.className =
                        this.playRef.current.className.replace("disabled", "");
                    this.pauseRef.current.className =
                        this.pauseRef.current.className.replace("disabled", "");
                    break;
                case 2: // Pause
                    clearInterval(timer.interval);
                    this.formatTime(timer.value);
                    timer.isStarted = false;
                    this.playRef.current.className =
                        this.playRef.current.className.replace("disabled", "");
                    this.pauseRef.current.className =
                        this.pauseRef.current.className + " disabled";
                    break;
            }
        }

        campaign.timers[timerNum] = timer;
        saveActiveCampaign(campaign);
    };

    render() {
        return (
            <Card className="card bg-dark">
                <Card.Header>
                    <input
                        type="text"
                        onBlur={() => this.setTimer()}
                        className={styles.timerName}
                        ref={this.inputRef}
                        placeholder="Timer Name"
                    />
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <p className={styles.timerElapsed} ref={this.elapsedRef}>
                                00:00:00
                            </p>
                        </Col>
                    </Row>
                    <fieldset>
                        <Row>
                            <Col md={4}>
                                <input type="number" onBlur={() => this.setTimer()} ref={this.elapsedHHRef} placeholder="HH" />
                            </Col>
                            <Col md={4}>
                                <input type="number" onBlur={() => this.setTimer()} ref={this.elapsedMMRef} placeholder="MM" />
                            </Col>
                            <Col md={4}>
                                <input type="number" onBlur={() => this.setTimer()} ref={this.elapsedSSRef} placeholder="SS" />
                            </Col>
                        </Row>
                    </fieldset>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Start the timer.")}
                        >
                            <Button
                                className="btn btn-primary btn-sm"
                                ref={this.playRef}
                                onClick={() => this.toggleTimer(this.props.timerIndex, 0)}
                            >
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Stop/reset the timer.")}
                        >
                            <Button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.toggleTimer(this.props.timerIndex, 1)}
                            >
                                <FontAwesomeIcon icon={faCircleStop} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Pause the timer.")}
                        >
                            <Button
                                className="btn btn-primary btn-sm"
                                ref={this.pauseRef}
                                onClick={() => this.toggleTimer(this.props.timerIndex, 2)}
                            >
                                <FontAwesomeIcon icon={faCirclePause} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Set the interval.")}
                        >
                            <Button
                                className="btn btn-small btn-primary btn-sm"
                                ref={this.pauseRef}
                                onClick={() => this.setElapsedValue()}
                            >
                                <FontAwesomeIcon icon={faClock} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        );
    }
}

export default Timer;
