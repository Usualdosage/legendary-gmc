import React, { Component } from "react";
import { getRandomNumber } from "../components/utils";
import { Button, OverlayTrigger, Card, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

class Time extends Component {
    constructor(props) {
        super(props);
        this.weatherRef = React.createRef();
        this.imageRef = React.createRef();
    }

    getWeatherIcon(icon) {
        switch (icon) {
            default:
            case "01d":
            case "01n":
                return "https://img.icons8.com/office/40/undefined/sun--v1.png";
            case "02d":
            case "02n":
                return "https://img.icons8.com/office/40/undefined/partly-cloudy-day--v1.png";
            case "03d":
            case "03n":
                return "https://img.icons8.com/office/40/undefined/clouds.png";
            case "04d":
            case "04n":
                return "https://img.icons8.com/office/40/undefined/clouds.png";
            case "09d":
            case "09n":
                return "https://img.icons8.com/office/40/undefined/light-rain.png";
            case "10d":
            case "10n":
                return "https://img.icons8.com/office/40/undefined/intense-rain.png";
            case "11d":
            case "11n":
                return "https://img.icons8.com/office/40/undefined/storm.png";
            case "13d":
            case "13n":
                return "https://img.icons8.com/office/40/undefined/snow.png";
            case "50d":
            case "50n":
                return "https://img.icons8.com/office/40/undefined/fog-day--v1.png";
        }
    }

    componentDidMount() {
        this.getWeather();
        setInterval(() => {
            this.getWeather();
        }, 3600000);
    }

    calcDir = (angle) => {
        var directions = [
            "north",
            "northeast",
            "east",
            "southeast",
            "south",
            "southwest",
            "west",
            "northwest",
        ];
        var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index];
    };

    getRandomLocation() {
        const cities = [
            "London",
            "Paris",
            "Dublin",
            "Edinburgh",
            "Amsterdam",
            "Berlin",
            "Budapest",
            "Vienna",
            "Brussels",
            "Bern",
            "Prague",
            "Bratislava",
            "Warsaw",
            "Riga",
            "Oslo",
        ];
        var num = getRandomNumber(cities.length);
        return cities[num - 1];
    }

    getWeather() {
        let key = this.getRandomLocation();
        let url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            key +
            "&units=imperial&appid=21937b4847733376896a8d3d2eb7f696";
        var result = fetch(url)
            .then((response) => response.json())
            .then((data) => {
                try {
                    // Get the UTC time of the sunrise
                    let sunrise = new Date(data.sys.sunrise * 1000);
                    let sunset = new Date(data.sys.sunset * 1000);

                    this.weatherRef.current.innerText =
                        "It is " +
                        Math.round(data.main.temp, 0) +
                        "° outside with " +
                        data.weather[0].description +
                        ", but feels like " +
                        Math.round(data.main.feels_like, 0) +
                        "°. The wind is out of the " +
                        this.calcDir(data.wind.deg) +
                        " at " +
                        Math.round(data.wind.speed) +
                        " MPH. The high today will be " +
                        Math.round(data.main.temp_max) +
                        "° and the low will be " +
                        Math.round(data.main.temp_min) +
                        "°." +
                        " Sunrise is at " +
                        this.toLocaleTime(sunrise, data.timezone) +
                        " and sunset is at " +
                        this.toLocaleTime(sunset, data.timezone) +
                        ".";

                    this.imageRef.current.src = this.getWeatherIcon(data.weather[0].icon);
                } catch {
                    console.log("Error loading weather.");
                }
            });
    }

    toLocaleTime(date, gmtOffset) {
        // Number of hours to add/subtract from the date
        var millisecOffset =
            (date.getTimezoneOffset() / 60) * 60 * 60 * 1000 + gmtOffset * 1000;
        const ms = date.getTime();
        const newDate = new Date(ms + millisecOffset);
        return newDate.toLocaleTimeString();
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    render() {
        return (
            <Card className="bg-dark">
                <Card.Header>
                    <b>Weather</b>
                </Card.Header>
                <Card.Body className="cardBody">
                    <span ref={this.weatherRef}></span>
                    <br />
                    <img ref={this.imageRef} />
                </Card.Body>
                <Card.Footer>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip(
                            null,
                            "Get weather from a random location."
                        )}
                    >
                        <Button
                            onClick={() => this.getWeather()}
                            className="btn btn-primary btn-sm"
                            ref={this.playRef}
                        >
                            <FontAwesomeIcon icon={faRefresh} />
                        </Button>
                    </OverlayTrigger>
                </Card.Footer>
            </Card>
        );
    }
}

export default Time;
