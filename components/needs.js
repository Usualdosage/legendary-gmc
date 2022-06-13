import React, { Component } from "react";
import {
    Card,
    ButtonGroup,
    Button,
    OverlayTrigger,
    Tooltip,
    ListGroup,
    ListGroupItem,
    Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBedPulse,
    faPlateWheat,
    faGlassWater,
    faCircleInfo,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import { Log } from "../components/logger";

class Needs extends Component {
    state = {
        messages: [],
        alerts: [],
    };

    constructor(props) {
        super(props);
        this.messageRef = React.createRef();
    }

    componentDidMount() {
        const campaign = loadActiveCampaign();

        if (campaign.needs === null) {
            Log("Creating needs...");

            campaign.needs = {
                hunger: 0,
                thirst: 0,
                sleep: 0,
            };

            saveActiveCampaign(campaign);

            Log("Saved needs.");
        }

        this.checkNeeds(campaign.needs);

        setInterval(() => { 
            const campaign = loadActiveCampaign();
            this.checkNeeds(campaign.needs)
        }, 5000);

        setInterval(() => {
            // Get the saved campaign
            const campaign = loadActiveCampaign();

            // Should not be null at this point
            if (campaign.needs) {
                campaign.needs.hunger += 1;
                campaign.needs.thirst += 1;
                campaign.needs.sleep += 1;
                saveActiveCampaign(campaign);
                this.checkNeeds(campaign.needs);
            }
        }, 3600000);
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    refreshNeeds() {
        // Get the saved campaign
        const campaign = loadActiveCampaign();

        // Should not be null at this point
        if (campaign.needs != null) {
            this.checkNeeds(campaign.needs);
        }
    }

    checkNeeds = (needs) => {
        if (needs === null) {
            return;
        }

        let messages = [];

        if (needs.hunger < 8) {
            messages.push({ message: "The group is well fed.", alert: "success" });
        } else if (needs.hunger >= 8 && needs.hunger < 16) {
            messages.push({
                message: "The group is a little hungry.",
                alert: "success",
            });
        } else if (needs.hunger >= 16 && needs.hunger < 24) {
            messages.push({
                message: "The group is quite hungry.",
                alert: "warning",
            });
        } else if (needs.hunger >= 24 && needs.hunger < 48) {
            messages.push({ message: "The group is famished.", alert: "warning" });
        } else if (needs.hunger >= 48 && needs.hunger < 72) {
            messages.push({ message: "The group is ravenous.", alert: "warning" });
        } else if (needs.hunger >= 72 && needs.hunger < 144) {
            messages.push({ message: "The group is STARVING.", alert: "danger" });
        } else if (needs.hunger >= 144 && needs.hunger < 288) {
            messages.push({
                message: "The group is STARVING to DEATH.",
                alert: "danger",
            });
        } else if (needs.hunger > 288) {
            messages.push({
                message: "The group will die soon if they do not eat.",
                alert: "danger",
            });
        } else {
            messages.push({
                message: "The group has died of starvation.",
                alert: "secondary",
            });
        }

        if (needs.thirst < 8) {
            messages.push({ message: "The group is not thirsty.", alert: "success" });
        } else if (needs.thirst >= 8 && needs.thirst < 16) {
            messages.push({ message: "The group quite thirsty.", alert: "success" });
        } else if (needs.thirst >= 16 && needs.thirst < 24) {
            messages.push({
                message: "The group should really drink something.",
                alert: "warning",
            });
        } else if (needs.thirst >= 24 && needs.thirst < 48) {
            messages.push({ message: "The group is dehydrated.", alert: "warning" });
        } else if (needs.thirst >= 48 && needs.thirst < 72) {
            messages.push({
                message: "The group is DYING of THIRST.",
                alert: "danger",
            });
        } else if (needs.thirst >= 72 && needs.thirst < 144) {
            messages.push({
                message: "The group will die soon if they do not drink.",
                alert: "danger",
            });
        } else {
            messages.push({
                message: "The group has died of thirst.",
                alert: "secondary",
            });
        }

        if (needs.sleep < 16) {
            messages.push({ message: "The group is well rested.", alert: "success" });
        } else if (needs.sleep >= 16 && needs.sleep < 24) {
            messages.push({
                message: "The group is a little tired.",
                alert: "success",
            });
        } else if (needs.sleep >= 24 && needs.sleep < 36) {
            messages.push({ message: "The group is very tired.", alert: "warning" });
        } else if (needs.sleep >= 36 && needs.sleep < 48) {
            messages.push({ message: "The group is exhausted.", alert: "warning" });
        } else if (needs.sleep >= 48 && needs.sleep < 72) {
            messages.push({
                message: "The group is becoming delirious from lack of sleep.",
                alert: "danger",
            });
        } else if (needs.thirst >= 72 && needs.thirst < 144) {
            messages.push({
                message: "The group will die soon if they do not rest.",
                alert: "danger",
            });
        } else {
            messages.push({
                message: "The group has likely died of sleep depravation.",
                alert: "secondary",
            });
        }

        this.setState({ messages: messages });
    };

    resetHunger() {
        const campaign = loadActiveCampaign();

        if (campaign.needs != null) {
            campaign.needs.hunger = 0;
            saveActiveCampaign(campaign);
            this.checkNeeds(campaign.needs);
        }
    }

    resetThirst() {
        const campaign = loadActiveCampaign();

        if (campaign.needs != null) {
            campaign.needs.thirst = 0;
            saveActiveCampaign(campaign);
            this.checkNeeds(campaign.needs);
        }
    }

    resetSleep() {
        const campaign = loadActiveCampaign();

        if (campaign.needs != null) {
            campaign.needs.sleep = 0;
            saveActiveCampaign(campaign);
            this.checkNeeds(campaign.needs);
        }
    }

    render() {
        return (
            <Card className="bg-dark">
                <Card.Header>
                    <b>Player Needs</b>
                </Card.Header>
                <Card.Body className="cardBody">
                    <ListGroup className="bg-dark">
                        {this.state.messages.map((message, index) => (
                            <ListGroupItem key={index} className="bg-dark">
                                <Badge pill bg={message.alert}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Badge>{" "}
                                {message.message}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Reset hunger.")}
                        >
                            <Button
                                onClick={() => this.resetHunger()}
                                className="btn btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faPlateWheat} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Reset thirst.")}
                        >
                            <Button
                                onClick={() => this.resetThirst()}
                                className="btn btn-small btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faGlassWater} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Reset sleep.")}
                        >
                            <Button
                                onClick={() => this.resetSleep()}
                                className="btn btn-small btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faBedPulse} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        );
    }
}

export default Needs;