import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Player from "../components/player";
import { MAX_PLAYERS } from "../components/const";

class Players extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let players = [];
        for (let x = 0; x < MAX_PLAYERS; x++) {
            players.push(<Player key={x} id={x} />);
        }
        return (
            <Card className="card bg-dark">
                <Card.Header>
                    <b>Players</b>
                </Card.Header>
                <Card.Body>{players}</Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        );
    }
}

export default Players;