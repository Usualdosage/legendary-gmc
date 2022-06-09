import React, { Component } from "react";
import { getRandomNumber } from "../components/utils";
import styles from '../components/canvas.module.css'

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            offSetX: -50,
            offSetY: 40,
            total: 0,
        };
    }

    roll = (facets) => {
        var result = getRandomNumber(facets);
        this.setState({ total: this.state.total + result });
        this.drawPolygon(facets, result, 100);
    };

    incrementOffset() {
        this.state.offSetX = this.state.offSetX + 90;
        const canvas = this.canvasRef.current;

        if (this.state.offSetX >= canvas.width) {
            this.state.offSetX = 40;
            this.state.offSetY += 90;
        }
    }

    drawPolygon = (facets, value) => {
        let textOffset = 0;
        if (value > 9) textOffset = 7;
        else if (value > 99) textOffset = 15;

        this.incrementOffset();
        const canvas = this.canvasRef.current;
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.font = "22px Arial";
        ctx.shadowColor = "#000000";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 6;
        switch (facets) {
            default:
                break;
            case 2:
                let text = "Heads";
                if (value == 1) text = "Tails";
                ctx.strokeStyle = "#2e2d2d";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    100,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#dddddd";
                ctx.font = "14px Courier";
                ctx.lineWidth = 1;
                ctx.strokeText(text, this.state.offSetX - 18, this.state.offSetY + 4);
                break;
            case 4:
                ctx.strokeStyle = "#3465eb";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY + 10,
                    40,
                    3,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6, 55);
                break;
            case 6:
                ctx.strokeStyle = "#eb5c34";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    40,
                    4,
                    -Math.PI / 4
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6, 50);
                ctx.closePath();
                break;
            case 8:
                ctx.strokeStyle = "#ed9a1c";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    6,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6, 48);
                break;
            case 10:
                ctx.strokeStyle = "#9f18d9";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    8,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6 - textOffset, 48);
                break;
            case 12:
                ctx.strokeStyle = "#17c228";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    10,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6 - textOffset, 48);
                break;
            case 20:
                ctx.strokeStyle = "#c1d115";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    12,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6 - textOffset, 48);
                break;
            case 100:
                ctx.strokeStyle = "#d41e76";
                this.polygon(
                    ctx,
                    this.state.offSetX,
                    this.state.offSetY,
                    35,
                    20,
                    -Math.PI / 2
                );
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = "#ffffff";
                ctx.strokeText(value, this.state.offSetX - 6 - textOffset, 48);
                break;
        }
    };

    gradient = (ctx, sides) => {
        var gradient = ctx.createLinearGradient(25, 0, 0, 0);
        switch (sides) {
            case 100: // D2
                gradient.addColorStop(0, "#525151");
                gradient.addColorStop(1, "#878787");
                break;
            case 3: // D4
                gradient.addColorStop(0, "#8facdb");
                gradient.addColorStop(1, "#4287f5");
                break;
            case 4: // D6
                gradient.addColorStop(0, "#e33252");
                gradient.addColorStop(1, "#f27289");
                break;
            case 6: // D8
                gradient.addColorStop(0, "#c47e14");
                gradient.addColorStop(1, "#c9994f");
                break;
            case 8: // D10
                gradient.addColorStop(0, "#a325d9");
                gradient.addColorStop(1, "#a452c7");
                break;
            case 10: // D12
                gradient.addColorStop(0, "#0cb31d");
                gradient.addColorStop(1, "#38d148");
                break;
            case 12: // D20
                gradient.addColorStop(0, "#aab814");
                gradient.addColorStop(1, "#d4e051");
                break;
            case 20: // D100
                gradient.addColorStop(0, "#ab185f");
                gradient.addColorStop(1, "#cc4184");
                break;
        }

        return gradient;
    };

    polygon = (ctx, x, y, radius, sides, rotateAngle) => {
        var a = (Math.PI * 2) / sides;
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(rotateAngle);
        ctx.moveTo(radius, 0);
        for (var i = 1; i < sides; i++) {
            ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
        }

        ctx.fillStyle = this.gradient(ctx, sides);
        ctx.fill();
        ctx.closePath();
    };

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

    addModifier = (count) => {
        this.setState({ total: this.state.total + count });
    };

    reset() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.setState({ total: 0, offSetX: -50 });
    }

    componentDidMount() {
        this.resizeCanvasToDisplaySize();
    }

    render() {
        return (
            <div>
                <div className="card-body">
                    <h5 id="diceTotal" className="card-title">
                        Total: {this.state.total}
                    </h5>
                    <span className="card-text">
                        <div id="diceContainer">
                            <canvas className={styles.canvas} ref={this.canvasRef} />
                        </div>
                    </span>
                </div>
                <div className="card-footer text-muted">
                    <div className="btn-group me-2" role="group" aria-label="First group">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(2)}
                        >
                            D2
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(4)}
                        >
                            D4
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(6)}
                        >
                            D6
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(8)}
                        >
                            D8
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(10)}
                        >
                            D10
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(12)}
                        >
                            D12
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(20)}
                        >
                            D20
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.roll(100)}
                        >
                            D100
                        </button>
                    </div>
                    <div
                        className="btn-group me-2"
                        role="group"
                        aria-label="Second group"
                    >
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addModifier(1)}
                        >
                            +1
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addModifier(2)}
                        >
                            +2
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addModifier(3)}
                        >
                            +3
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addModifier(4)}
                        >
                            +4
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addModifier(5)}
                        >
                            +5
                        </button>
                    </div>
                    <div className="btn-group me-2" role="group" aria-label="Third group">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.reset()}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Canvas;
