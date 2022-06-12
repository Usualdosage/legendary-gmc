import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styles from "./campaign.module.css";

class Create extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.validatorRef = React.createRef();
    }

    createCampaign() {
        const savedCampaigns = localStorage.getItem("dmc_campaigns");

        if (this.inputRef.current.value.trim() == "") {
            this.validatorRef.current.innerText = "Please provide a name.";
            return;
        }

        let campaign = {
            name: this.inputRef.current.value,
            needs: null,
            timers: null,
            date: null,
            players: null,
            monsters: null,
            isActive: true,
        };

        let campaigns;

        if (savedCampaigns) {
            campaigns = JSON.parse(savedCampaigns);
        } else {
            campaigns = [];
        }

        if (campaigns.length > 0) {
            for (let x = 0, c; (c = campaigns[x]); x++) {
                if (c.name.toLowerCase() == campaign.name.toLowerCase()) {
                    this.validatorRef.current.innerText =
                        "That name is already in use. Please enter a new name.";
                    return;
                }
            }
        }

        campaigns.push(campaign);

        localStorage.setItem("dmc_campaigns", JSON.stringify(campaigns));

        window.location.href = "/playertracker";
    }

    render() {
        return (
            <span>
                <input
                    type="text"
                    ref={this.inputRef}
                    className={styles.campaignInput}
                    placeholder="Enter Campaign Name"
                ></input>
                <Button onClick={() => this.createCampaign()}>
                    Create A New Campaign
                </Button>
                <div ref={this.validatorRef} className={styles.validator}></div>
            </span>
        );
    }
}

export default Create;
