import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Load extends Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
    }

    loadCampaign()
    {
        this.fileRef.current.click();
    }

    render() {
        return (
            <span>
                <Button onClick={() => this.loadCampaign()}>
                    Load From File
                </Button>
                <input type="file" id="file" style={{display: "none"}} ref={this.fileRef}/>
            </span>
        );
    }
}

export default Load;
