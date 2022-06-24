import React, { Component } from "react";
import {
    Card,
    ButtonGroup,
    Button,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faForward,
    faForwardStep,
    faForwardFast,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { loadActiveCampaign, saveActiveCampaign } from "../components/utils";
import { Log } from "../components/logger";

class Time extends Component {
    constructor(props) {
        super(props);
        this.timeRef = React.createRef();
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        // Get the saved campaign object
        let campaign = loadActiveCampaign();

        // If we have don't have a saved date, randomize one
        if (campaign.date === null) {
            Log("Creating random campaign date...");
            campaign.date = this.getRandomDate();
            saveActiveCampaign(campaign);
            Log("Saved date.");
        }

        this.displayDate(campaign.date);

        setInterval(() => {
            let campaign = loadActiveCampaign();

            // Should not be null at this point
            if (campaign.date) {
                campaign.date = this.tick(campaign.date);
                saveActiveCampaign(campaign);
                this.displayDate(campaign.date);
            }
        }, 1000);
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    advanceDate(minutes) {
        let campaign = loadActiveCampaign();

        // Get the saved needs object
        let savedNeeds = campaign.needs;

        // Should not be null at this point
        if (campaign.date) {
            switch (minutes) {
                case 1: // 1 minute
                    campaign.date.minute += 1;
                    break;
                case 60: // 1 hour
                    campaign.date.hour += 1;
                    campaign.needs.hunger += 1;
                    campaign.needs.thirst += 1;
                    campaign.needs.sleep += 1;
                    break;
                case 1440: // 1 day
                    campaign.date.day += 1;
                    campaign.needs.hunger += 24;
                    campaign.needs.thirst += 24;
                    campaign.needs.sleep += 24;
                    break;
            }

            if (campaign.date.minute >= 60) {
                campaign.date.minute = 0;
                campaign.date.hour += 1;
            }

            if (campaign.date.hour >= 24) {
                campaign.date.hour = 0;
                campaign.date.day += 1;
            }

            if (campaign.date.day >= 30) {
                campaign.date.day = 0;
                campaign.date.month += 1;
                if (campaign.date.month >= 12) {
                    campaign.date.month = 1;
                    campaign.date.year++;
                }
            }

            saveActiveCampaign(campaign);
            this.displayDate(campaign.date);
        }
    }

    tick(dateInfo) {
        dateInfo.second += 1;
        if (dateInfo.second >= 60) {
            dateInfo.second = 0;
            dateInfo.minute += 1;
            if (dateInfo.minute >= 60) {
                dateInfo.minute = 0;
                dateInfo.hour += 1;
                if (dateInfo.hour >= 24) {
                    dateInfo.hour = 0;
                    dateInfo.day += 1;
                    if (dateInfo.day >= 30) {
                        dateInfo.day == 0;
                        dateInfo.month += 1;
                        if (dateInfo.month >= 12) {
                            dateInfo.month = 1;
                            dateInfo.year++;
                        }
                    }
                }
            }
        }
        return dateInfo;
    }

    displayDate(dateInfo) {
        const months = [
            "Khodarus",
            "Ashuran",
            "Faustan",
            "Indiran",
            "Meriman",
            "Chiran",
            "Trajan",
            "Vashuran",
            "Atrinan",
            "Khodan",
            "Sauran",
            "Rathan",
        ];
        const dayOfWeek = this.calculateDayOfWeek(dateInfo.day);

        let moonInfo = this.getMoon(dateInfo.day);

        var displayText =
            "It is " +
            this.formatSeason(dateInfo.month) +
            " on " +
            dayOfWeek +
            ", the " +
            this.formatNumber(dateInfo.day) +
            " day of " +
            months[dateInfo.month] +
            ", in the year " +
            dateInfo.year +
            ". The time is " +
            this.formatTime(dateInfo.hour, dateInfo.minute, dateInfo.second) +
            ". " +
            moonInfo.moonMessage +
            " " +
            this.getHolidays(dateInfo.month, dateInfo.day);

        if (this.timeRef.current != null) {
            this.timeRef.current.innerText = displayText;
        }

        if (this.imageRef.current != null) {
            this.imageRef.current.src = moonInfo.moonImage;
        }
    }

    getMoon(day) {
        let moonMessage = "";
        let moonImage = "";
        let moonDay = day % 24;
        switch (moonDay) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                moonMessage = "There is a waxing crescent moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/waxing-crescent-moon.png";
                break;
            case 6:
            case 18:
                moonMessage = "There is a half moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/first-quarter-moon.png";
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                moonMessage = "There is a waxing gibbous moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/waxing-gibbous-moon.png";
                break;
            case 12:
                moonMessage = "There is a full moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/full-moon-emoji.png";
                break;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                moonMessage = "There is a waning gibbous moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/waning-gibbous-moon.png";
                break;
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                moonMessage = "There is a waning crescent moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/waning-crescent-moon.png";
                break;
            case 0:
            case 24:
                moonMessage = "There is a new moon tonight.";
                moonImage =
                    "https://img.icons8.com/emoji/48/undefined/new-moon-emoji.png";
                break;
        }

        return { moonMessage, moonImage };
    }

    getHolidays(month, day) {
        switch (month + 1) {
            default:
                return "There are no holidays today.";
            case 1: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 1:
                        return "Today is New Year's Day.";
                    case 30:
                        return "Today is The Celebration of the Two Chalices.";
                }
            }
            case 2: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 1: // 31
                        return "Today is the Day of the Dead.";
                    case 9: // 39
                        return "Today is Shayl Nag.";
                    case 26: // 56
                        return "Today is The Bonfire.";
                }
            }
            case 3: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 4: //64
                        return "Today is Darul Tine.";
                }
            }
            case 4: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 11: //101
                        return "Today is Nature Day.";
                }
            }
            case 5: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 13: //133
                        return "Today is Mother's Day.";
                    case 30: //150
                        return "Today is The Baptism.";
                }
            }
            case 6: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 8: //158
                        return "Today is The Mystran Joust.";
                    case 23: //173
                        return "Today is The Day of Remembrance.";
                }
            }
            case 6: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 15: //195
                        return "Today is The Day of Purgation.";
                }
            }
            case 8: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 28: //238
                        return "Today is The Illumination.";
                }
            }
            case 9: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 1: //241
                        return "Today is The Day of Peace.";
                    case 15: //255
                        return "Today is The Sailfin Regatta.";
                    case 20: //260
                        return "Today is Veteran's Day.";
                }
            }
            case 10: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 3: //273
                        return "Today is Labor Day.";
                }
            }
            case 11: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 1: //301
                        return "Today is The Day of the Shadows.";
                    case 15: //315
                        return "Today is The Burning of the Lamps.";
                    case 28: //350
                        return "Today is The Call to Power.";
                }
            }
            case 12: {
                switch (day) {
                    default:
                        return "There are no holidays today.";
                    case 7:
                        return "Today is the Dark Dance.";
                    case 20:
                        return "Today is Winter's End.";
                    case 30:
                        return "Today is Cayl Tine.";
                }
            }
        }
    }

    getRandomDate() {
        let dateInfo = {
            month: this.getRandomInt(12),
            day: this.getRandomInt(30),
            year: this.getRandomInt(2000),
            hour: this.getRandomInt(24),
            minute: this.getRandomInt(60),
            second: this.getRandomInt(60),
        };
        return dateInfo;
    }

    formatTime(hour, minute, second) {
        let ampm = "AM";
        let displayHour = hour;

        if (hour >= 12) {
            displayHour = hour - 12;
            ampm = "PM";
        }

        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }

        return displayHour + ":" + minute + ":" + second + " " + ampm;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    formatSeason(month) {
        switch (month) {
            case 1:
            case 2:
            case 3:
                return "spring";
            case 4:
            case 5:
            case 6:
                return "summer";
            case 7:
            case 8:
            case 9:
                return "autumn";
            case 10:
            case 11:
            case 12:
                return "winter";
        }
    }

    formatNumber(day) {
        switch (day) {
            default:
                return day + "th";
            case 1:
            case 21:
                return day + "st";
            case 2:
            case 22:
                return day + "nd";
            case 3:
            case 23:
                return day + "rd";
        }
    }

    calculateDayOfWeek(day) {
        const daysOfTheWeek = [
            "Khoday",
            "Ashday",
            "Meriday",
            "Vashday",
            "Fireday",
            "Sauraday",
        ];
        let weekDay = day % 6;
        return daysOfTheWeek[weekDay];
    }

    render() {
        return (
            <Card className="bg-dark">
                <Card.Header>
                    <b>Game Time</b>
                </Card.Header>
                <Card.Body className="cardBody">
                    <span ref={this.timeRef}></span>
                    <br />
                    <img ref={this.imageRef}></img>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Advance the time one minute.")}
                        >
                            <Button
                                onClick={() => this.advanceDate(1)}
                                className="btn btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faForward} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Advance the time one hour.")}
                        >
                            <Button
                                onClick={() => this.advanceDate(60)}
                                className="btn btn-small btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faForwardStep} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(null, "Advance the time one day.")}
                        >
                            <Button
                                onClick={() => this.advanceDate(1440)}
                                className="btn btn-small btn-primary btn-sm"
                            >
                                <FontAwesomeIcon icon={faForwardFast} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        );
    }
}

export default Time;
