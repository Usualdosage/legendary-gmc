import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import React, { Component } from "react";
import { Col, Row, Badge } from "react-bootstrap";
import styles from "./player.module.css";
import { MAX_PLAYERS } from "../components/const";
import { Log } from "../components/logger";

class Player extends Component {
    state = {
        id: this.props.id,
        playerName: "",
        init: 0,
        hp_current: 0,
        mana_current: 0,
        isSurprised: false,
        hasEffect: false,
        move: "",
        attack: "",
        defense: "",
        ranged: "",
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var campaign = loadActiveCampaign();

        if (campaign.players == null) {
            Log("Initializing players...");
            campaign.players = [];
            for (let x = 0; x < MAX_PLAYERS; x++) campaign.players[x] = {};
        }

        let player = campaign.players.find((obj) => {
            return parseInt(obj.id) === parseInt(this.props.id);
        });

        if (player) {
            this.setState({ playerName: player.playerName });
            this.setState({ hp_current: player.hp_current });
            this.setState({ mana_current: player.mana_current });
            this.setState({ init: player.init });
            this.setState({ isSurprised: player.isSurprised });
            this.setState({ hasEffect: player.hasEffect });
            this.setState({ move: player.move });
            this.setState({ attack: player.attack });
            this.setState({ defense: player.defense });
            this.setState({ ranged: player.ranged });
        }
    }

    savePlayer = (event) => {
        let value = event.target.value;

        if (event.target.type === "checkbox") {
            value = event.target.checked;
        }

        this.setState({ [event.target.name]: value }, () => {
            var campaign = loadActiveCampaign();
            campaign.players[this.props.id].hp_current = this.state.hp_current;
            campaign.players[this.props.id].mana_current = this.state.mana_current;
            campaign.players[this.props.id].init = this.state.init;
            campaign.players[this.props.id].isSurprised = this.state.isSurprised;
            campaign.players[this.props.id].hasEffect = this.state.hasEffect;
            saveActiveCampaign(campaign);
        });
    };

    render() {
        return (
            <Row>
                <Col md={3}>
                    <label className="control-label">Player Name</label>
                    <span className={styles.playerLabel}>
                        <Badge bg="secondary"></Badge>&nbsp;{this.state.playerName}
                    </span>
                </Col>
                <Col md={1}>
                    <label className="control-label">Init</label>
                    <input
                        type="text"
                        name={"init"}
                        onChange={(e) => {
                            this.savePlayer(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Init"
                        defaultValue={this.state.init}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Health</label>
                    <input
                        type="text"
                        name={"hp_current"}
                        onChange={(e) => {
                            this.savePlayer(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="HP"
                        defaultValue={this.state.hp_current}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Mana</label>
                    <input
                        type="text"
                        name={"mana_current"}
                        onChange={(e) => {
                            this.savePlayer(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Mana"
                        defaultValue={this.state.mana_current}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Move</label>
                    <span className={styles.playerLabel}>{this.state.move}</span>
                </Col>
                <Col md={1}>
                    <label className="control-label">Attack</label>
                    <span className={styles.playerLabel}>{this.state.attack}</span>
                </Col>
                <Col md={1}>
                    <label className="control-label">Defense</label>
                    <span className={styles.playerLabel}>{this.state.defense}</span>
                </Col>
                <Col md={1}>
                    <label className="control-label">Ranged</label>
                    <span className={styles.playerLabel}>{this.state.ranged}</span>
                </Col>
                <Col md={1}>
                    <label className="control-label">Surprised</label>
                    <input
                        type="checkbox"
                        name={"isSurprised"}
                        onClick={(e) => {
                            this.savePlayer(e);
                        }}
                        defaultChecked={this.state.isSurprised == true}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Affected</label>
                    <input
                        type="checkbox"
                        name={"hasEffect"}
                        onClick={(e) => {
                            this.savePlayer(e);
                        }}
                        defaultChecked={this.state.hasEffect == true}
                    />
                </Col>
            </Row>
        );
    }
}

export default Player;
