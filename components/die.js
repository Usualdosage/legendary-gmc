import React, { Component } from "react";
import styles from "./dice.module.css"

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
        let dieStyle = this.props.sides === 100 ? styles.die100 : "die";
        dieStyle = this.props.sides === 2 ? styles.die2 : dieStyle;
        let numberStyle = [styles.dieNumber, "die_sides_" + this.props.sides].join(' ');
        
        return (
            <div className={styles.dieBlock}>
                <div className={numberStyle}>{this.props.result}</div>
                <img className={dieStyle} src={this.state.imageUrl} alt={this.state.imageAlt}/>
            </div>
        )
    }
}

export default Die