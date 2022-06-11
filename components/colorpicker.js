import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import {
    ToggleButton
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPalette
} from "@fortawesome/free-solid-svg-icons";

class Colorpicker extends Component {
    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
        let popover = {
            position: 'absolute',
            zIndex: '2',
            top: '10px',
            left: '10px'
        }
        let cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return ( <div>
                <ToggleButton onClick={this.handleClick}><FontAwesomeIcon icon={faPalette} /></ToggleButton>
                {this.state.displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={this.handleClose} />
                    <GithubPicker />
                </div> : <div/>}
            </div>
        )        
    }
}

export default Colorpicker;

