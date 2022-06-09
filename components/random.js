import React, { Component } from "react";
import { Dropdown, Card, Row, Col, Modal } from "react-bootstrap";
import {
    getRandomItem,
    getRandomSword,
    getRandomAxe,
    getRandomSpear,
    getRandomDagger,
    getRandomExotic,
    getRandomPolearm,
    getRandomBlunt,
    getRandomRanged,
    getRandomArmor,
} from "../components/data";
import { getRandomName } from "../components/names";

class Random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedValue: null,
            results: [],
        };
    }

    setShow = (value) => {
        this.setState({ show: value });
    };

    setSelectedValue = (value) => {
        this.setState({ selectedValue: value });
    };

    handleClose = () => this.setShow(false);

    getRandomThing = (eventKey, event) => {
        this.setSelectedValue(event.target.innerText);

        let results = [];

        switch (event.target.innerText.toLowerCase()) {
            case "human":
            case "dwarf":
            case "elf":
            case "halfling":
            case "fairy":
            case "gnome":
            case "half-orc":
            case "giant": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomName(event.target.innerText.toLowerCase()));
                }
                this.setState({ results: results });
                break;
            }
            case "food":
            case "liquid":
            case "common":
            case "ordinary":
            case "magical": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomItem(event.target.innerText.toLowerCase()));
                }
                this.setState({ results: results });
                break;
            }
            case "head":
            case "body":
            case "arms":
            case "legs":
            case "hands":
            case "feet": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomArmor(event.target.innerText.toLowerCase()));
                }
                this.setState({ results: results });
                break;
            }
            case "sword": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomSword());
                }
                this.setState({ results: results });
                break;
            }
            case "axe": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomAxe());
                }
                this.setState({ results: results });
                break;
            }
            case "spear": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomSpear());
                }
                this.setState({ results: results });
                break;
            }
            case "dagger": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomDagger());
                }
                this.setState({ results: results });
                break;
            }
            case "polearm": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomPolearm());
                }
                this.setState({ results: results });
                break;
            }
            case "blunt": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomBlunt());
                }
                this.setState({ results: results });
                break;
            }
            case "ranged": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomRanged());
                }
                this.setState({ results: results });
                break;
            }
            case "exotic": {
                for (let x = 0; x < 10; x++) {
                    results.push(getRandomExotic());
                }
                this.setState({ results: results });
                break;
            }
        }

        this.setShow(true);
    };

    render() {
        let results = [];
        for (let x = 0, result; (result = this.state.results[x]); x++) {
            results.push(<div className="randomItem">{result}</div>);
        }
        return (
            <div>
                <Row>
                    <Col md={3}>
                        <Card className="card bg-dark">
                            <Card.Header>
                                <b>Weapons</b>
                            </Card.Header>
                            <Card.Body>
                                <Dropdown onSelect={this.getRandomThing}>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Select Weapon
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Sword</Dropdown.Item>
                                        <Dropdown.Item>Axe</Dropdown.Item>
                                        <Dropdown.Item>Spear</Dropdown.Item>
                                        <Dropdown.Item>Dagger</Dropdown.Item>
                                        <Dropdown.Item>Polearm</Dropdown.Item>
                                        <Dropdown.Item>Blunt</Dropdown.Item>
                                        <Dropdown.Item>Exotic</Dropdown.Item>
                                        <Dropdown.Item>Ranged</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="card bg-dark">
                            <Card.Header>
                                <b>Armor</b>
                            </Card.Header>
                            <Card.Body>
                                <Dropdown onSelect={this.getRandomThing}>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Select Item
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Head</Dropdown.Item>
                                        <Dropdown.Item>Body</Dropdown.Item>
                                        <Dropdown.Item>Arms</Dropdown.Item>
                                        <Dropdown.Item>Legs</Dropdown.Item>
                                        <Dropdown.Item>Hands</Dropdown.Item>
                                        <Dropdown.Item>Feet</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="card bg-dark">
                            <Card.Header>
                                <b>Items</b>
                            </Card.Header>
                            <Card.Body>
                                <Dropdown onSelect={this.getRandomThing}>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Select Type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Food</Dropdown.Item>
                                        <Dropdown.Item>Liquid</Dropdown.Item>
                                        <Dropdown.Item>Ordinary</Dropdown.Item>
                                        <Dropdown.Item>Common</Dropdown.Item>
                                        <Dropdown.Item>Magical</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="card bg-dark">
                            <Card.Header>
                                <b>Names</b>
                            </Card.Header>
                            <Card.Body>
                                <Dropdown onSelect={this.getRandomThing}>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Select Race
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Human</Dropdown.Item>
                                        <Dropdown.Item>Dwarf</Dropdown.Item>
                                        <Dropdown.Item>Elf</Dropdown.Item>
                                        <Dropdown.Item>Fairy</Dropdown.Item>
                                        <Dropdown.Item>Halfling</Dropdown.Item>
                                        <Dropdown.Item>Gnome</Dropdown.Item>
                                        <Dropdown.Item>Giant</Dropdown.Item>
                                        <Dropdown.Item>Half-Orc</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    bg="dark"
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header className="bg-dark" closeButton>
                        <Modal.Title>
                            Random Results for {this.state.selectedValue}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark">{results}</Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Random;
