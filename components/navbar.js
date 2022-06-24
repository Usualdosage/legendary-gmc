import React, { Component } from "react";
import { loadActiveCampaign, deleteActiveCampaign, saveActiveCampaign, exportCampaigns } from "./utils";
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Breadcrumb,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

class NavBar extends Component {
    constructor(props) {
        super(props);        
        this.crumbRef = React.createRef();
    }

    componentDidMount() {
        this.getBreadcrumb();
    }

    deleteCampaign() {
        if (confirm("This will permanently delete this campaign. Are you sure?")) {
            deleteActiveCampaign();
            window.location.href = "/";
        }
    }

    saveCampaignToDisk() { 
        Log("Saving campaign to disk...");

        // Save changes to current
        var campaign = loadActiveCampaign();
        saveActiveCampaign(campaign);

        // Export all
        let content = exportCampaigns();
    }

    getBreadcrumb() {
        let path = window.location.pathname.replace("/", "");
        path = path.charAt(0).toUpperCase() + path.slice(1);
        this.crumbRef.current.innerText = path;
    }

    render = () => {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Game Master's Companion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Campaigns" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Campaigns</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => this.saveCampaignToDisk()}
                                >
                                    Save Campaigns to Disk
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    className={styles.abandon_campaign}
                                    onClick={() => this.deleteCampaign()}
                                >
                                    Abandon Campaign
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Apps" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/gametracker">
                                    Game Tracker
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/playertracker">
                                    Player Tracker
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/timers">Timers</NavDropdown.Item>
                                <NavDropdown.Item href="/randomizers">
                                    Randomizers
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/dice">Dice Roller</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/maps">Maps</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Legendary MUD" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/grid">Online Area Builder</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Breadcrumb className="bg-dark">
                            <Breadcrumb.Item active>
                                <span className="breadcrumb-loc" ref={this.crumbRef}></span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        );
    };
}
export default NavBar;