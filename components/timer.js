import React, { Component } from "react";
import { Button, ButtonGroup, Card, Row, Col, OverlayTrigger, Tooltip, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
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
import { formatTime } from "../components/utils"
import { Log } from "../components/logger";

class Timer extends Component {
    state = {
            isIntervalTimer: false,
            isPaused: false,
            hh: 0,
            mm: 0,
            ss: 0
        }

    constructor(props) {
        super(props);
        this.elapsedRef = React.createRef();
        this.inputRef = React.createRef();
    }
    
    componentDidMount()
    {
        let campaign = loadActiveCampaign();
        this.initializeTimers(campaign.timers);
    }

    saveTimerName()
    {
        let campaign = loadActiveCampaign();
        campaign.timers[this.props.timerIndex].name = this.inputRef.current.value;
        saveActiveCampaign(campaign);
    }

    setIntervalType(value, intervalType) {
        let intVal = parseInt(value);
        console.log(intVal);

        switch (intervalType) {
            case "h":
                this.setState({ hh: intVal }, () => { this.checkResetInterval() });
                break;
            case "m":
                this.setState({ mm: intVal }, () => { this.checkResetInterval() });
                break;
            case "s":
                this.setState({ ss: intVal }, () => { this.checkResetInterval() });
                break;
        }

        this.checkResetInterval();
    }

    checkResetInterval() {
        // If everything is a zero, this is not an interval timer.
        if (this.state.hh === 0 && this.state.mm === 0 && this.state.ss === 0) {
            this.setState({ isIntervalTimer: false });
        }
        else {
            this.setState({ isIntervalTimer: true });
        }
    }

    initializeTimers = (timers) => {
        Log("Initializing timers...");

        if (timers === null) 
            timers = [];

        for (let x = 0; x < MAX_TIMERS; x++) {
            timers.push({
                id: x,
                name: "Timer " + (x + 1),
                isStarted: false,
                hh: 0,
                mm: 0,
                ss: 0,
                value: 0,
                maxValue: 0,
                intervalRef: null
            });
        }

        let campaign = loadActiveCampaign();
        campaign.timers = timers;
        saveActiveCampaign(campaign);

        return timers;
    };

    // Starts the timer. If it's an interval timer, configures that.
    startTimer() {
        let campaign = loadActiveCampaign();
        let timer = campaign.timers[this.props.timerIndex];
        timer.value = 0;
        timer.isStarted = true;
        timer.hh = this.state.hh;
        timer.mm = this.state.mm;
        timer.ss = this.state.ss;
        timer.maxValue = this.state.ss + (this.state.mm * 60) + (this.state.hh * 60 * 60)
        let intervalRef = setInterval(() => { 
            this.displayElapsed();
        }, 1000);
        timer.intervalRef = intervalRef;
        campaign.timers[this.props.timerIndex] = timer;
        saveActiveCampaign(campaign);
        Log(`Timer ${timer.name} started.`)   
        console.table(timer); 
    }

    // Stops and fully resets the timer.
    stopTimer(){
        let campaign = loadActiveCampaign();
        let timer = campaign.timers[this.props.timerIndex];
        timer.value = 0;
        timer.isStarted = false;
        timer.maxValue = 0;
        timer.hh = this.state.hh;
        timer.mm = this.state.mm;
        timer.ss = this.state.ss;
        campaign.timers[this.props.timerIndex] = timer;
        saveActiveCampaign(campaign);
        clearInterval(timer.intervalRef);
        let display = formatTime(0);
        this.elapsedRef.current.innerText = display;
        Log(`Timer ${timer.name} stopped.`)
    }

    // Pauses the timer.
    pauseTimer(){     
        let campaign = loadActiveCampaign();
        let timer = campaign.timers[this.props.timerIndex];
        this.setState({isPaused: !this.state.isPaused}, () => { 
            if (this.state.isPaused)
            {
                timer.isStarted = false;
                clearInterval(timer.intervalRef);
                Log(`Timer ${timer.name} paused.`)
            }
            else
            {
                timer.isStarted = true;
                setInterval(() => { 
                    this.displayElapsed();
                }, 1000);
                Log(`Timer ${timer.name} unpaused.`);
            }
            
        })
    }

    displayElapsed() {
        let campaign = loadActiveCampaign();
        let timer = campaign.timers[this.props.timerIndex];
        let display = formatTime(timer.value);
        this.elapsedRef.current.innerText = display;
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    render() {
        let intervalBadge = this.state.isIntervalTimer ? styles.intervalShow : styles.intervalHidden;
        return (
            <Card className="card bg-dark">
                <Card.Header>
                    <input
                        type="text"
                        onBlur={() => this.saveTimerName()}
                        className={styles.timerName}
                        ref={this.inputRef}
                        placeholder="Timer Name"
                    />
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroupItem className="bg-dark">
                            <p className={styles.timerElapsed} ref={this.elapsedRef}>
                                00:00:00
                            </p>
                        </ListGroupItem>
                        <ListGroupItem className="bg-dark">
                            <Row>
                                <Col md={4}>
                                    <label className="control-label">Hours</label>
                                    <input type="number" onChange={(e) => this.setIntervalType(e.target.value, 'h')} placeholder="00" />
                                </Col>
                                <Col md={4}>
                                    <label className="control-label">Minutes</label>
                                    <input type="number" onChange={(e) => this.setIntervalType(e.target.value, 'm')} placeholder="00" />
                                </Col>
                                <Col md={4}>
                                    <label className="control-label">Seconds</label>
                                    <input type="number" onChange={(e) => this.setIntervalType(e.target.value, 's')} placeholder="00" />
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className="bg-dark">
                            <Badge className={intervalBadge}>Interval</Badge>
                        </ListGroupItem>
                    </ListGroup>
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
                                onClick={() => this.startTimer()}
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
                                onClick={() => this.stopTimer()}
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
                                onClick={() => this.pauseTimer()}
                            >
                                <FontAwesomeIcon icon={faCirclePause} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        );
    }
}

export default Timer;
