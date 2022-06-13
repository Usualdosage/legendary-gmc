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
import { Log } from "../components/logger";

class Header extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.crumbRef = React.createRef();
    }

    componentDidMount() {
        var campaign = loadActiveCampaign();
        if (this.nameRef.current != null) {
            this.nameRef.current.defaultValue = campaign.name;
        }
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


    onBlur(e) {
        var campaign = loadActiveCampaign();
        campaign.name = e.target.value;
        saveActiveCampaign(campaign);
    }

    getBreadcrumb() {
        let path = window.location.pathname.replace("/", "");
        path = path.charAt(0).toUpperCase() + path.slice(1);
        this.crumbRef.current.innerText = path;
    }

    render = () => {
        return (
            <div>
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
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Breadcrumb className="bg-dark">
                                <Breadcrumb.Item active>
                                    <span className="breadcrumb-loc" ref={this.crumbRef}></span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <a alt="Access the help section" className={styles.helpLink} href ="/help"><FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon></a>
                        </Navbar.Collapse>
                        
                    </Container>
                </Navbar>
                <div className="bg-dark px-4 py-1 my-1 text-center flex-grow-1">
                    <input type="text" className={styles.campaignName} ref={this.nameRef} onBlur={(e) => { this.onBlur(e) }}></input>
                </div>
            </div>
        );
    };
}
export default Header;
