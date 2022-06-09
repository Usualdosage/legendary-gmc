import React, { Component } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MAX_PLAYERS } from "../components/const";
import styles from "./player.module.css";
import { Log } from "../components/logger";

class PlayerDetail extends Component {
    state = {
        id: this.props.id,
        playerName: "",
        hp: 0,
        hp_current: 0,
        mana: 0,
        mana_current: 0,
        move: 0,
        attack: 0,
        defense: 0,
        ranged: 0,
        str: 0,
        int: 0,
        wis: 0,
        dex: 0,
        con: 0,
        chr: 0,
        race: "",
        deity: "",
        age: 0,
        height: "",
        weight: 0,
        carry: 0,
        hometown: "",
        spell: 0,
        mind: 0,
        afflictive: 0,
        maledictive: 0,
        death: 0,
        gold: 0,
        notes: "",
        init: 0,
        isSurprised: false,
        hasEffect: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadPlayer();
    }

    loadPlayer() {
        var campaign = loadActiveCampaign();

        if (campaign.players == null) {
            Log("Initializing players...");
            campaign.players = [];
            for (let x = 0; x < MAX_PLAYERS; x++) campaign.players[x] = {};
        }

        saveActiveCampaign(campaign);

        let player = campaign.players.find((obj) => {
            return obj.id === this.props.id;
        });

        if (player) {
            var props = Object.getOwnPropertyNames(player);
            var values = Object.values(player);
            for (let x = 0, prop; (prop = props[x]); x++) {
                this.setState({ [prop]: values[x] });
            }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    deletePlayer() {
        if (
            confirm(
                "Are you sure you want to delete this player? This action is permanent."
            )
        ) {
            var campaign = loadActiveCampaign();
            let player = campaign.players.find((obj) => {
                return obj.id === this.props.id;
            });
            if (player) {
                campaign.players[this.props.id] = {};
                saveActiveCampaign(campaign);

                var props = Object.getOwnPropertyNames(player);
                for (let x = 0, prop; (prop = props[x]); x++) {
                    this.setState({ [prop]: null });
                }
            }
        }
    }

    savePlayer() {
        var campaign = loadActiveCampaign();

        var player = {
            id: this.props.id,
            playerName: this.state.playerName,
            hp: this.state.hp,
            mana: this.state.mana,
            move: this.state.move,
            attack: this.state.attack,
            defense: this.state.defense,
            ranged: this.state.ranged,
            str: this.state.str,
            int: this.state.int,
            wis: this.state.wis,
            dex: this.state.dex,
            con: this.state.con,
            chr: this.state.chr,
            race: this.state.race,
            deity: this.state.deity,
            age: this.state.age,
            height: this.state.height,
            weight: this.state.weight,
            carry: this.state.carry,
            hometown: this.state.hometown,
            spell: this.state.spell,
            mind: this.state.mind,
            afflictive: this.state.afflictive,
            maledictive: this.state.maledictive,
            death: this.state.death,
            gold: this.state.gold,
            notes: this.state.notes,
        };

        campaign.players[this.props.id] = player;
        saveActiveCampaign(campaign);
    }

    render() {
        return (
            <Card className="card bg-dark">
                <Card.Header>
                    <b>{this.state.playerName}</b>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <label className="control-label">Player Name</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"playerName"}
                                className={styles.playerInput}
                                placeholder="Full Name"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.playerName}
                            />
                        </Col>
                        <Col md={4}>
                            <label className="control-label">Hometown</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"hometown"}
                                className={styles.playerInput}
                                placeholder="Hometown"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                defaultValue={this.state.hometown}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label className="control-label">Health</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"hp"}
                                className={styles.playerInput}
                                placeholder="HP"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                defaultValue={this.state.hp}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Mana</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"mana"}
                                className={styles.playerInput}
                                placeholder="Mana"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.mana}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Movement</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"move"}
                                className={styles.playerInput}
                                placeholder="Move"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.move}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Attack</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"attack"}
                                className={styles.playerInput}
                                placeholder="Attack"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.attack}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Defense</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"defense"}
                                className={styles.playerInput}
                                placeholder="Defense"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.defense}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Ranged</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"ranged"}
                                className={styles.playerInput}
                                placeholder="Ranged"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.ranged}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label className="control-label">Strength</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"str"}
                                className={styles.playerInput}
                                placeholder="STR"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.str}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Intelligence</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"int"}
                                className={styles.playerInput}
                                placeholder="INT"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.int}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Wisdom</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"wis"}
                                className={styles.playerInput}
                                placeholder="WIS"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.wis}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Dexterity</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"dex"}
                                className={styles.playerInput}
                                placeholder="DEX"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.dex}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Constitution</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"con"}
                                className={styles.playerInput}
                                placeholder="CON"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.con}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Charisma</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"chr"}
                                className={styles.playerInput}
                                placeholder="CHR"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.chr}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label className="control-label">Race</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"race"}
                                className={styles.playerInput}
                                placeholder="Race"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.race}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Deity</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"deity"}
                                className={styles.playerInput}
                                placeholder="Deity"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.deity}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Age</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"age"}
                                className={styles.playerInput}
                                placeholder="Age"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.age}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Height</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"height"}
                                className={styles.playerInput}
                                placeholder="Height"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.height}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Weight</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"weight"}
                                className={styles.playerInput}
                                placeholder="Weight"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.weight}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Carry Weight</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"carry"}
                                className={styles.playerInput}
                                placeholder="Carry"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.carry}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label className="control-label">Spell</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"spell"}
                                className={styles.playerInput}
                                placeholder="Spell"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.spell}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Mind</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"mind"}
                                className={styles.playerInput}
                                placeholder="Mind"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.mind}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Afflictive</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"afflictive"}
                                className={styles.playerInput}
                                placeholder="Afflictive"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.afflictive}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Maledictive</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"maledictive"}
                                className={styles.playerInput}
                                placeholder="Maledictive"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.maledictive}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Death</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"death"}
                                className={styles.playerInput}
                                placeholder="Death"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.death}
                            />
                        </Col>
                        <Col md={2}>
                            <label className="control-label">Money</label>
                            <input
                                type="text"
                                onBlur={() => this.savePlayer()}
                                onClick={(e) => e.target.select()}
                                name={"gold"}
                                className={styles.playerInput}
                                placeholder="Gold"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                value={this.state.gold}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <textarea
                                name={"notes"}
                                onBlur={() => this.savePlayer()}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                defaultValue={this.state.notes}
                            ></textarea>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Button className="btn btn-primary btn-sm">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => this.deletePlayer()}
                        />
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default PlayerDetail;
