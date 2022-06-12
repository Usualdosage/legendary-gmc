import { faRulerVertical } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Log } from "../components/logger"

class Load extends Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();

        this.state = {
            selectedFile: null
        }
    }

    loadCampaign() {
        if (confirm('This will overwrite any current, existing campaigns with your saved data. Are you sure?')) {
            this.fileRef.current.click();
        }
    }

    selectFile(e) {
        try {
            Log("Reading campaign from disk...");
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onload = e => {
                const text = e.target.result;
                const jObject = JSON.parse(text);
                // Quick check to see if we have properties in the right place
                let isValid = false;
                const firstCampaign = jObject[0];
                if (firstCampaign) {
                    if (firstCampaign.name && firstCampaign.needs && firstCampaign.date) {
                        isValid = true;
                    }
                }

                if (isValid === true) {
                    Log("JSON validated. Overwriting campaigns with new data.");
                    localStorage.setItem("dmc_campaigns", JSON.stringify(jObject));
                    window.location.reload(false);
                }
                else {
                    Log("Invalid JSON. Load aborted.");
                }
            };
        }
        catch
        {
            Log("Unable to load campaigns from disk.")
        }
    }

    render() {
        return (
            <span>
                <Button onClick={() => this.loadCampaign()}>
                    Load From File
                </Button>
                <input type="file" id="file" style={{ display: "none" }} ref={this.fileRef} onChange={this.selectFile} />
            </span>
        );
    }
}

export default Load;
