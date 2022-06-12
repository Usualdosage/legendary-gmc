import React, { Component } from "react";
import styles from "./dice.module.css"
import { getRandomNumber } from "../components/utils"

class Die extends Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            imageUrl: "../img/d" + this.props.sides + ".png",
            imageAlt: "Roll a " + this.props.sides + "-sided die.",
        }
    }

    render() {
        let dieStyle = this.props.sides === 100 ? "die100" : "die";
        dieStyle = this.props.sides === 2 ? "die2": dieStyle;
        let numberStyle = "dieNumber " + "die_sides_" + this.props.sides;
        return (
            <div className={styles.dieBlock}>
                <div className={numberStyle}>{this.props.result}</div>
                <img className={dieStyle} src={this.state.imageUrl} alt={this.state.imageAlt}/>
            </div>
        )
    }
}

export default Die