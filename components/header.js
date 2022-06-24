import React, { Component } from "react";
import { loadActiveCampaign, deleteActiveCampaign, saveActiveCampaign, exportCampaigns } from "./utils";
import NavBar from "../components/navbar"
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
    }

    componentDidMount() {
        var campaign = loadActiveCampaign();
        if (this.nameRef.current != null) {
            this.nameRef.current.defaultValue = campaign.name;
        }
    }

    onBlur(e) {
        var campaign = loadActiveCampaign();
        campaign.name = e.target.value;
        saveActiveCampaign(campaign);
    }

    render = () => {
        return (
            <div>
                <NavBar></NavBar>
                <div className="bg-dark px-4 py-1 my-1 text-center flex-grow-1">
                    <input type="text" className={styles.campaignName} ref={this.nameRef} onBlur={(e) => { this.onBlur(e) }}></input>
                </div>
            </div>
        );
    };
}
export default Header;
