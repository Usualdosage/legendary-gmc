import React, { Component } from "react";
import {
    ToggleButton,
    ToggleButtonGroup,
    Dropdown,
    Modal,
    OverlayTrigger,
    Tooltip,
    Row,
    Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpDownLeftRight,
    faPencil,
    faEraser,
    faBrush,
    faTableCells,
    faEyeSlash,
    faEdit,
    faPalette
} from "@fortawesome/free-solid-svg-icons";
import Colorpicker from "./colorpicker";
import styles from "./map.module.css";
import { Log } from "./logger";


class Map extends Component {
    state = {
        show: false,
        mapName: "",
        drag: true,
        draw: false,
        erase: false,
        fill: false,
        grid: false,
        overlay: false,
        scale: 1.0,
        mousedown: false,
        cursorPosBefore: { x: 0, y: 0 },
        radius: 20,
        area: (2 * Math.PI) / 6,
        reveal: true,
        imagePosBefore: null,
        imagePosAfter: { x: 0, y: 0 },
        arcRad: 10,
        brushWidth: 50,
        penWidth: 5,
        mapPaths: [],
        selectedMap: "",
        canvasScale: 1.0,
        penColor: "#FF0000",
    };

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.canvasRef = React.createRef();
        this.containerRef = React.createRef();
        this.overlayRef = React.createRef();
        this.brushSizeRef = React.createRef();
        this.gridSizeRef = React.createRef();
    }

    toggleTool(drag, draw, erase, fill) {
        this.setState({ drag: drag, draw: draw, erase: erase, fill: fill });
    }

    toggleGrid() {
        this.setState({ grid: !this.state.grid });
        if (this.state.grid) {
            this.canvasRef.current.style.display = "block";
        } else {
            this.canvasRef.current.style.display = "none";
        }
    }

    toggleOverlay() {
        this.setState({ overlay: !this.state.overlay });
        if (this.state.overlay) {
            this.overlayRef.current.style.display = "block";
        } else {
            this.overlayRef.current.style.display = "none";
        }
    }

    componentDidMount() {
        this.getMaps();
    }

    resizeCanvasToDisplaySize() {
        const canvas = this.canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }

    resizeOverlayToDisplaySize() {
        const canvas = this.overlayRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        var ctx = canvas.getContext("2d");
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;

            ctx.beginPath();
            ctx.rect(0, 0, width, height);
            ctx.fillStyle = "#222";
            ctx.fill();

            return true;
        }
        return false;
    }

    drawGrid = () => {
        const canvas = this.canvasRef.current;
        const width = this.canvasRef.current.width + this.state.radius;
        const height = this.canvasRef.current.height + this.state.radius;
        var ctx = canvas.getContext("2d");

        let r = this.state.radius;
        let a = this.state.area;

        for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
            for (
                let x = r, j = 0;
                x + r * (1 + Math.cos(a)) < width;
                x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
            ) {
                this.drawHexagon(ctx, x, y);
            }
        }
    };

    drawHexagon = (ctx, x, y) => {
        let a = this.state.area;
        let r = this.state.radius;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.strokeStyle = "#ccc";
        ctx.closePath();
        ctx.stroke();
    };

    clearArc(x, y, reveal) {
        let overlay = this.overlayRef.current;
        let ctx = overlay.getContext("2d");

        ctx.save();

        if (reveal) {
            ctx.globalCompositeOperation = "destination-out";
        }

        ctx.beginPath();
        ctx.arc(x, y, this.state.brushWidth, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }

    drawPoint(e, x, y) {
        let overlay = this.canvasRef.current;
        let ctx = overlay.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineCap = 'round';
        ctx.lineWidth = this.state.penWidth;
        ctx.lineTo(e.pageX - 5, e.pageY - 70);
        ctx.strokeStyle = this.state.penColor;
        ctx.stroke();
    }

    renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    handleClose = () => this.setState({ show: false });

    showMap = (key, event) => {
        let mapPath = "../../../maps/" + event.target.innerText + ".jpg";
        this.setState({ show: true, mapName: event.target.innerText, selectedMap: mapPath }, () => {
            this.containerRef.current.addEventListener("wheel", this.mouseWheel, {
                passive: false,
            });
            this.resizeCanvasToDisplaySize();
            this.resizeOverlayToDisplaySize();
            this.drawGrid();
        });
    };

    mouseMove(e) {
        if (this.state.drag === true && this.state.mousedown === true) {
            let newXPos =
                this.state.imagePosBefore.x - this.state.cursorPosBefore.x + e.clientX;

            let newYPos =
                this.state.imagePosBefore.y - this.state.cursorPosBefore.y + e.clientY;

            this.setState({ imagePosAfter: { x: newXPos, y: newYPos } });
        } else if (this.state.draw === true && this.state.mousedown === true) {
            this.drawPoint(e, e.clientX - 5, e.clientY - 70);
        } else if (this.state.fill === true && this.state.mousedown === true) {
            this.clearArc(e.clientX + 10, e.clientY - 60, false);
        } else if (this.state.reveal === true && this.state.mousedown === true) {
            this.clearArc(e.clientX + 10, e.clientY - 60, true);
        }
    }

    getMaps() {
        fetch('/api/listMaps')
            .then((response) => response.json())
            .then((data) => {
                let dropDowns = [];
                data.map(m => {
                    let mapName = m.replace('./public/maps/', '').replace('.jpg', '')
                    dropDowns.push(<Dropdown.Item value={m}>{mapName}</Dropdown.Item>)
                });
                this.setState({ mapPaths: dropDowns })
            })
    }

    mouseWheel = (e) => {
        let sign = Math.sign(e.deltaY);

        if (sign === 1) {
            if (this.state.scale === 1) return;
            this.setState({ scale: this.state.scale - 0.5 });
        } else {
            this.setState({ scale: this.state.scale + 0.5 });
        }

        e.preventDefault();
        e.stopPropagation();
    };

    mouseDown(e) {
        this.setState({
            mousedown: true,
            cursorPosBefore: { x: e.clientX, y: e.clientY },
            imagePosBefore: this.state.imagePosAfter,
        });
    }

    mouseUp(e) {
        this.setState({
            mousedown: false,
        });
    }

    changeBrushWidth(e) {
        this.setState({
            brushWidth: e.target.value,
        });
    }

    changePenWidth(e) {
        this.setState({
            penWidth: e.target.value,
        });
    }

    changeGridSize(e) {
        this.setState({ canvasScale: e.target.value })
    }

    colorPickerChange(e) {
        this.setState({ penColor: e })
    }

    render() {
        let containerStyle = {
            cursor:
                this.state.mousedown === true && this.state.drag === true
                    ? "grabbing"
                    : "default",
        };
        let mapStyle = {
            transform: "scale(" + this.state.scale + ")",
            backgroundPositionX: this.state.imagePosAfter.x + "px",
            backgroundPositionY: this.state.imagePosAfter.y + "px",
            backgroundImage: "url('" + this.state.selectedMap + "')",
        };
        let canvasStyle = {
            transform: "scale(" + this.state.canvasScale + ")",
        }
        return (
            <Row centered>
                <Col md={12}>
                    <Dropdown onSelect={this.showMap}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            SELECT A MAP
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.state.mapPaths}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Modal
                        bg="dark"
                        centered="true"
                        fullscreen
                        show={this.state.show}
                        onHide={this.handleClose}
                    >
                        <Modal.Header className="bg-dark" closeButton>
                            <Modal.Title>Map of {this.state.mapName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark overflow-hidden">
                            <div
                                ref={this.containerRef}
                                onMouseMove={(e) => this.mouseMove(e)}
                                onMouseDown={(e) => this.mouseDown(e)}
                                onMouseUp={(e) => {
                                    this.mouseUp(e);
                                }}
                                className={styles.layerContainer}
                                style={containerStyle}
                            >
                                <div
                                    ref={this.mapRef}
                                    style={mapStyle}
                                    className={styles.mapImage}
                                ></div>
                                <canvas
                                    ref={this.overlayRef}
                                    className={styles.mapOverlay}
                                ></canvas>
                                <canvas
                                    ref={this.canvasRef}
                                    className={styles.mapCanvas}
                                    style={canvasStyle}
                                ></canvas>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="bg-dark">
                            <div className={styles.paletteColor} style={{backgroundColor: this.state.penColor}}></div>
                            <Colorpicker color={this.state.penColor} onChange={(e) => this.colorPickerChange(e)} />
                            <FontAwesomeIcon icon={faTableCells} />
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step=".1"
                                defaultValue="1"
                                className="slider"
                                onChange={(e) => this.changeGridSize(e)}
                                ref={this.gridSizeRef}
                            />
                            <FontAwesomeIcon icon={faEdit} />
                            <input
                                type="range"
                                min="1"
                                max="100"
                                defaultValue={this.state.penWidth}
                                className="slider"
                                onChange={(e) => this.changePenWidth(e)}
                                ref={this.penSizeRef}
                            />
                            <FontAwesomeIcon icon={faBrush} />
                            <input
                                type="range"
                                min="1"
                                max="100"
                                defaultValue={this.state.brushWidth}
                                className="slider"
                                onChange={(e) => this.changeBrushWidth(e)}
                                ref={this.brushSizeRef}
                            />
                            <ToggleButtonGroup name="mapEditor">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Drag map.")}
                                >
                                    <ToggleButton
                                        checked
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleTool(!this.state.drag, false, false, false);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faUpDownLeftRight} />
                                    </ToggleButton>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Mark on map.")}
                                >
                                    <ToggleButton
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleTool(false, !this.state.draw, false, false);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </ToggleButton>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Reveal section.")}
                                >
                                    <ToggleButton
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleTool(false, false, !this.state.reveal, false);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEraser} />
                                    </ToggleButton>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Hide section.")}
                                >
                                    <ToggleButton
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleTool(false, false, false, !this.state.fill);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBrush} />
                                    </ToggleButton>
                                </OverlayTrigger>
                            </ToggleButtonGroup>
                            <ToggleButtonGroup name="grid">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Toggle overlay.")}
                                >
                                    <ToggleButton
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleOverlay();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </ToggleButton>
                                </OverlayTrigger>
                            </ToggleButtonGroup>
                            <ToggleButtonGroup name="overlay">
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(null, "Toggle grid.")}
                                >
                                    <ToggleButton
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            this.toggleGrid();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTableCells} />
                                    </ToggleButton>
                                </OverlayTrigger>
                            </ToggleButtonGroup>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        );
    }
}

export default Map;
