import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import React, { Component } from "react";
import { Col, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDice } from "@fortawesome/free-solid-svg-icons";
import { MAX_MONSTERS } from "../components/const";
import styles from "./monster.module.css";

class Monster extends Component {
    state = {
        id: this.props.id,
        monsterName: "",
        init: 0,
        hp: 0,
        mana: 0,
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

        if (campaign.monsters == null) {
            console.log("Initializing monsters...");
            campaign.monsters = [];
            for (let x = 0; x < MAX_MONSTERS; x++) campaign.monsters[x] = { id: x };
        }

        saveActiveCampaign(campaign);

        let monster = campaign.monsters.find((obj) => {
            return parseInt(obj.id) === parseInt(this.props.id);
        });

        if (monster) {
            this.setState({ monsterName: monster.monsterName });
            this.setState({ hp: monster.hp });
            this.setState({ mana: monster.mana });
            this.setState({ init: monster.init });
            this.setState({ isSurprised: monster.isSurprised });
            this.setState({ hasEffect: monster.hasEffect });
            this.setState({ move: monster.move });
            this.setState({ attack: monster.attack });
            this.setState({ defense: monster.defense });
            this.setState({ ranged: monster.ranged });
        }
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    killMonster = (event) => {
        var campaign = loadActiveCampaign();
        campaign.monsters[this.props.id - 1] = {};

        this.setState({ monsterName: "" });
        this.setState({ hp: "" });
        this.setState({ mana: "" });
        this.setState({ init: "" });
        this.setState({ isSurprised: false });
        this.setState({ hasEffect: false });
        this.setState({ move: "" });
        this.setState({ attack: "" });
        this.setState({ defense: "" });
        this.setState({ ranged: "" });

        saveActiveCampaign(campaign);
    };

    rollInit = () => {
        var campaign = loadActiveCampaign();
        var result = Math.floor(Math.random() * 12) + 1;
        this.setState({ init: result }, () => {
            campaign.monsters[this.props.id].init = this.state.init;
            saveActiveCampaign(campaign);
        });
    };

    saveMonster = (event) => {
        let value = event.target.value;

        if (event.target.type === "checkbox") {
            value = event.target.checked;
        }

        this.setState({ [event.target.name]: value }, () => {
            var campaign = loadActiveCampaign();
            let index = parseInt(this.props.id);

            let monster = campaign.monsters.find((obj) => {
                return parseInt(obj.id) === parseInt(index);
            });

            monster.monsterName = this.state.monsterName;
            monster.hp = this.state.hp;
            monster.mana = this.state.mana;
            monster.init = this.state.init;
            monster.move = this.state.move;
            monster.attack = this.state.attack;
            monster.defense = this.state.defense;
            monster.ranged = this.state.ranged;
            monster.isSurprised = this.state.isSurprised;
            monster.hasEffect = this.state.hasEffect;

            campaign.monsters[index] = monster;
            saveActiveCampaign(campaign);
        });
    };

    render() {
        return (
            <Row>
                <Col md={3}>
                    <label className="control-label">
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Remove this monster.")}
                        >
                            <Button
                                bg="secondary"
                                className={styles.monsterButton}
                                onClick={(e) => this.killMonster()}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </OverlayTrigger>
                        &nbsp;
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Roll initiative.")}
                        >
                            <Button
                                bg="secondary"
                                className={styles.monsterButton}
                                onClick={(e) => this.rollInit()}
                            >
                                <FontAwesomeIcon icon={faDice} />
                            </Button>
                        </OverlayTrigger>{" "}
                        Name
                    </label>
                    <input
                        type="text"
                        name={"monsterName"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Name"
                        defaultValue={this.state.monsterName}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Init</label>
                    <input
                        type="text"
                        name={"init"}
                        onChange={(e) => {
                            this.saveMonster(e);
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
                        name={"hp"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="HP"
                        defaultValue={this.state.hp}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Mana</label>
                    <input
                        type="text"
                        name={"mana"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Mana"
                        defaultValue={this.state.mana}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Move</label>
                    <input
                        type="text"
                        name={"move"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Move"
                        defaultValue={this.state.move}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Attack</label>
                    <input
                        type="text"
                        name={"attack"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Move"
                        defaultValue={this.state.attack}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Defense</label>
                    <input
                        type="text"
                        name={"defense"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Move"
                        defaultValue={this.state.defense}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Ranged</label>
                    <input
                        type="text"
                        name={"ranged"}
                        onChange={(e) => {
                            this.saveMonster(e);
                        }}
                        onClick={(e) => e.target.select()}
                        className={styles.playerInput_sm}
                        placeholder="Move"
                        defaultValue={this.state.ranged}
                    />
                </Col>
                <Col md={1}>
                    <label className="control-label">Surprised</label>
                    <input
                        type="checkbox"
                        name={"isSurprised"}
                        onClick={(e) => {
                            this.saveMonster(e);
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
                            this.saveMonster(e);
                        }}
                        defaultChecked={this.state.hasEffect == true}
                    />
                </Col>
            </Row>
        );
    }
}

export default Monster;
