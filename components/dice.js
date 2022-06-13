import React, { Component } from "react";
import Die from "../components/die"
import { Button, ButtonGroup } from "react-bootstrap";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumber } from "../components/utils"
import styles from "./dice.module.css"
import { Log } from "./logger";

class Dice extends Component {
    state = {
        children: [],
        totalScore: 0,
        lastRoll: 0,
        numDice: 0,
    }

    constructor(props) {
        super(props);
        this.diceArea = React.createRef();
    }

    addModifier(modifier, multiply) {
        if (this.state.numDice === 0)
            return;

        // Adjust the total scores and the roll
        let totalScore = this.state.totalScore - this.state.lastRoll;
        let newRoll = this.state.lastRoll;

        let prefix = "+";

        if (multiply === true) {
            newRoll = newRoll * modifier;
            prefix = "X";
        }
        else {
            newRoll = newRoll + modifier;
        }

        totalScore = totalScore + newRoll;

        const dice = this.state.children;
        dice.push(<span className={styles.modifier}>{prefix}{modifier}</span>);
        this.setState({ children: dice, totalScore: totalScore, lastRoll: newRoll })
    }

    rollDie(sides) {

        this.setState({ numDice: this.state.numDice + 1 });

        // Play a sound
        let audio = new Audio("/audio/dice.mp3");
        audio.play();

        let result;

        if (sides === 100) // D100 (Percentiles)
        {
            let left = getRandomNumber(10);
            let right = getRandomNumber(10);

            if (left === 10) {
                left = "0";
            }
            if (right === 10) {
                right = "0";
            }

            left = left + "0";

            let num = parseInt(left.toString()) + parseInt(right.toString());

            if (left === 0 && right === 0) {
                num = 100;
            }

            // Critical!
            if (num === sides) {
                let audio = new Audio("/audio/ding.mp3");
                audio.play();
            }
            // FAIL!
            else if (num === 1 && sides != 2) {
                let audio = new Audio("/audio/fail.mp3");
                audio.play();
            }

            Log(`Rolled a ${sides} sided die and got ${num}.`)

            this.setState({ totalScore: this.state.totalScore + num, lastRoll: num });

            result = <div><span className="dieLeft">{left}</span><span className="dieRight">{right}</span></div>;
        }
        else // D2-D20
        {
            let roll = getRandomNumber(sides);

            Log(`Rolled a ${sides} sided die and got ${roll}.`)

            // Special rules for D10
            if (roll === 10 && sides === 10) {
                roll = 0;
            }

            // Critical!
            if (roll === sides && sides != 2) {
                let audio = new Audio("/audio/ding.mp3");
                audio.play();
            }
            // FAIL!
            else if (roll === 1 && sides != 2) {
                let audio = new Audio("/audio/fail.mp3");
                audio.play();
            }

            this.setState({ totalScore: this.state.totalScore + roll, lastRoll: roll });

            if (sides === 2) {
                if (roll === 1) {
                    roll = "Tails";
                }
                else {
                    roll = "Heads";
                }
            }

            result = <span>{roll}</span>;
        }

        const dice = this.state.children;
        dice.push(<Die sides={sides} result={result}></Die>);
        this.setState({ children: dice })
    }

    reset() {
        this.setState({ children: [], totalScore: 0, lastRoll: 0, numDice: 0 })
    }

    render() {
        return (
            <div>
                <div className={styles.totalScore}>
                    <span style={{ margin: 5 }} className='badge badge-dark'>You have rolled {this.state.numDice} times.</span>
                    <span style={{ margin: 5 }} className='badge badge-dark'>Total score is {this.state.totalScore}.</span>
                    <span style={{ margin: 5 }} className='badge badge-dark'>Last roll was {this.state.lastRoll}.</span>
                </div>
                <div className={styles.buttonArea}>
                    <ButtonGroup className={styles.buttonGroup}>
                        <Button onClick={() => { this.rollDie(2) }}>Coin</Button>
                        <Button onClick={() => { this.rollDie(4) }}>D4</Button>
                        <Button onClick={() => { this.rollDie(6) }}>D6</Button>
                        <Button onClick={() => { this.rollDie(8) }}>D8</Button>
                        <Button onClick={() => { this.rollDie(10) }}>D10</Button>
                        <Button onClick={() => { this.rollDie(12) }}>D12</Button>
                        <Button onClick={() => { this.rollDie(20) }}>D20</Button>
                        <Button onClick={() => { this.rollDie(100) }}>D100</Button>
                    </ButtonGroup>
                    <ButtonGroup className={styles.buttonGroup}>
                        <Button onClick={() => { this.addModifier(1, false) }}>+1</Button>
                        <Button onClick={() => { this.addModifier(2, false) }}>+2</Button>
                        <Button onClick={() => { this.addModifier(3, false) }}>+3</Button>
                        <Button onClick={() => { this.addModifier(4, false) }}>+4</Button>
                        <Button onClick={() => { this.addModifier(5, false) }}>+5</Button>
                    </ButtonGroup>
                    <ButtonGroup className={styles.buttonGroup}>
                        <Button onClick={() => { this.addModifier(2, true) }}>X2</Button>
                        <Button onClick={() => { this.addModifier(3, true) }}>X3</Button>
                        <Button onClick={() => { this.addModifier(4, true) }}>X4</Button>
                        <Button onClick={() => { this.addModifier(5, true) }}>X5</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={() => { this.reset() }}>
                            <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
                        </Button>
                    </ButtonGroup>
                </div>
                <div ref={this.diceArea} className={styles.diceArea}>
                    {this.state.children}
                </div>
            </div>
        )
    }
}

export default Dice