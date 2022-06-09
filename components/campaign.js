import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { saveCampaign, resetCampaigns } from "../components/utils";
 
class Campaign extends Component {
  state = {
    campaigns: [],
  };
  constructor(props) {
    super(props);
  }
 
  componentDidMount() {
    this.loadCampaigns();
  }
 
  loadCampaigns() {
    const savedCampaigns = localStorage.getItem("dmc_campaigns");
 
    if (savedCampaigns) {
      let campaigns = JSON.parse(savedCampaigns);
      this.setState({ campaigns: campaigns });
    } else {
      this.setState({ campaigns: [] });
    }
  }
 
  loadCampaign(name) {
    const savedCampaigns = localStorage.getItem("dmc_campaigns");
 
    if (savedCampaigns) {
      let campaigns = JSON.parse(savedCampaigns);
 
      for (let x = 0, campaign; (campaign = campaigns[x]); x++) {
        if (campaign.name.toLowerCase() === name.toLowerCase()) {
          campaign.isActive = true;
        } else {
          campaign.isActive = false;
        }
 
        saveCampaign(campaign);
      }
    }
 
    window.location.href = "/gametracker";
  }
 
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle>Load Existing Campaign</Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.campaigns.map((campaign, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => {
                this.loadCampaign(campaign.name);
              }}
            >
              {campaign.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
 
export default Campaign;
