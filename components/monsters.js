import React, { Component } from "react";
import { Card, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import Monster from "../components/monster";
import { MAX_MONSTERS } from "../components/const";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadActiveCampaign, saveActiveCampaign } from "./utils";

class Monsters extends Component {
    constructor(props) {
        super(props);
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    resetMonsters() {
        var campaign = loadActiveCampaign();
        campaign.monsters = null;
        saveActiveCampaign(campaign);
    }

    render() {
        let monsters = [];
        for (let x = 0; x < MAX_MONSTERS; x++) {
            monsters.push(<Monster key={"monster_" + x} id={x} />);
        }
        return (
            <Card className="card bg-dark">
                <Card.Header>
                    <b>Monsters</b>
                </Card.Header>
                <Card.Body>{monsters}</Card.Body>
                <Card.Footer>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip(null, "Reset monsters.")}
                    >
                        <Button
                            checked
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                this.resetMonsters();
                            }}
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                        </Button>
                    </OverlayTrigger>
                </Card.Footer>
            </Card>
        );
    }
}

export default Monsters;
