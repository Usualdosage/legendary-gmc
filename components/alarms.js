import React, { Component } from "react";
import { loadActiveCampaign, saveActiveCampaign } from "./utils";
import styles from "./alarms.module.css";

class Alarms extends Component {
    constructor(props) {
        super(props);
        this.toastRef = React.createRef();
    }

    componentDidMount() {
        setInterval(() => {
            let campaign = loadActiveCampaign();

            if (campaign.timers != null) {
                for (let x = 0, timer; timer = campaign.timers[x]; x++) {                    
                    if (timer.isStarted) {
                        //console.table(timer);
                        // If this is an interval timer, see if we have met the interval.
                        if (timer.maxValue > 0 && timer.value > 1 && (timer.value % timer.maxValue === 0)) {

                            // Show the toast.
                            if (this.toastRef.current != null) {
                                this.toastRef.current.className = styles.toastAlert;
                                this.toastRef.current.innerHTML =
                                    "Timer '" +
                                    timer.name +
                                    '\' has elapsed. <a href="/timers">Click here</a> to view timers.';
                            }

                            // Play a sound
                            let audio = new Audio("/audio/chime.mp3");
                            audio.play();

                            // Hide the toast after 5 seconds.
                            setTimeout(() => {
                                this.toastRef.current.className = "hidden";
                            }, 5000);
                        } 

                        // Increment the timer.
                        timer.value += 1;    
                    }

                    campaign.timers[x] = timer;
                }
                saveActiveCampaign(campaign);
            }
        }, 1000);
    }

    render() {
        return <div ref={this.toastRef}
            className="hidden"> </div>;
    }
}

export default Alarms;