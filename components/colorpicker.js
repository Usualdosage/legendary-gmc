import React, { Component } from 'react';
import { HexColorPicker } from "react-colorful";
import {
    ToggleButton
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPalette
} from "@fortawesome/free-solid-svg-icons";

class Colorpicker extends Component {
    constructor(props)
    {
        super(props);
    }

    state = {
        displayColorPicker: false,
        pickerX: 70,
        pickerY: 100
    };

    handleClick = (e) => {        
        this.setState({ displayColorPicker: !this.state.displayColorPicker, pickerX: e.clientX, pickerY: e.clientY - 250 })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
        let popover = {
            position: 'absolute',
            top: this.state.pickerY + 'px',
            left: this.state.pickerX + 'px',
            zIndex: 100
        }
        let cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return ( <div>
                <ToggleButton onClick={(e) => {this.handleClick(e)}}><FontAwesomeIcon icon={faPalette}/></ToggleButton>
                {this.state.displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={this.handleClose} />
                    <HexColorPicker onChange={this.props.onChange}/>
                </div> : <div/>}
            </div>
        )        
    }
}

export default Colorpicker;

