import React, { Component } from "react";
import Room from "../components/room";
import styles from "../components/grid.module.css";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
 
export class Grid extends Component {
  state = {
    pipelines: [],
    validated: false,
    area: {
      name: null,
      author: null,
      description: null,
      id: Math.floor(Math.random() * 1000000) + 1000,
    },
    grid: null,
    savedAreas: [],
    selectedArea: null,
    outputJSON: null,
    show: false,
  };
  constructor(props) {
    super(props);
  }
 
  componentDidMount() {
    //localStorage.removeItem("legendary_saved_areas");
    this.getSavedAreas();
  }
 
  hideModal = () => {
    this.setState({ show: false });
  };
 
  showModal = () => {
    this.setState({ show: true });
  };
 
  generateJSON = () => {
    let areas = localStorage.getItem("legendary_saved_areas");
 
    if (areas === null) {
      localStorage.setItem("legendary_saved_areas", JSON.stringify([]));
    }
 
    let areaArray = JSON.parse(localStorage.getItem("legendary_saved_areas"));
 
    let areaIndex = areaArray.findIndex((a) => a.id === this.state.area.id);
 
    if (areaIndex > -1) {
      let areaToSave = areaArray[areaIndex];
 
      let rooms = [];
 
      for (let x = 0, room; (room = areaToSave.rooms[x]); x++) {
        let terrain = 0;
 
        switch (room.terrain) {
          default:
          case "City":
            terrain = 0;
            break;
          case "Mountains":
            terrain = 1;
            break;
          case "Hills":
            terrain = 2;
            break;
          case "Grasslands":
            terrain = 3;
            break;
          case "Water":
            terrain = 4;
            break;
          case "Swamp":
            terrain = 5;
            break;
          case "Air":
            terrain = 6;
            break;
          case "Beach":
            terrain = 7;
            break;
          case "Ethereal":
            terrain = 8;
            break;
          case "Forest":
            terrain = 9;
            break;
          case "Jungle":
            terrain = 10;
            break;
          case "Desert":
            terrain = 11;
            break;
            case "Snow":
            terrain = 12;
            break;
        }
 
        let roomToSave = {
          RoomId: parseInt(room.roomId),
          AreaId: this.state.area.id,
          Name: room.name,
          Description: room.description,
          Exits: [],
          Flags: [],
          Image: room.image,
          Terrain: terrain,
        };
 
        if (room.flags != null) {
          for (let y = 0, flag; (flag = room.flags[y]); y++) {
            let intFlag = 0;
            switch (flag) {
              default:
              case "flag-dark":
                intFlag = 0;
                break;
              case "flag-indoors":
                intFlag = 1;
                break;
            }
 
            roomToSave.Flags.push(intFlag);
          }
        }
 
        if (room.exits != null) {
          for (let i = 0, exit; (exit = room.exits[i]); i++) {
            let direction = 0;
            switch (exit.dir) {
              default:
              case "exitNorth":
                direction = 0;
                break;
              case "exitSouth":
                direction = 1;
                break;
              case "exitEast":
                direction = 3;
                break;
              case "exitWest":
                direction = 2;
                break;
              case "exitUp":
                direction = 8;
                break;
              case "exitDown":
                direction = 9;
                break;
                case "exitNE":
                direction = 4;
                break;
              case "exitNW":
                direction = 5;
                break;
              case "exitSE":
                direction = 6;
                break;
              case "exitSW":
                direction = 7;
                break;
            }
            let exitToSave = {
              Direction: direction,
              ToArea: this.state.area.id,
              ToRoom: parseInt(exit.to),
            };
 
            roomToSave.Exits.push(exitToSave);
          }
        }
        rooms.push(roomToSave);
      }
 
      let output = {
        _id: areaToSave.id,
        AreaId: this.state.area.id,
        Name: areaToSave.name,
        Author: areaToSave.author,
        Description: areaToSave.description,
        Rooms: rooms,
      };
 
      this.setState({ outputJSON: output });
      this.showModal();
    } else {
      alert("Nothing to generate.");
    }
  };
 
  renderGrid = () => {
    let updatedTable = this.tableGenerator();
    this.setState({ grid: updatedTable }, () => {
      this.render();
    });
  };
 
  saveArea = () => {
    let areas = localStorage.getItem("legendary_saved_areas");
 
    if (areas === null) {
      localStorage.setItem("legendary_saved_areas", JSON.stringify([]));
    }
 
    let areaArray = JSON.parse(localStorage.getItem("legendary_saved_areas"));
 
    let area = {
      name: this.state.area.name,
      author: this.state.area.author,
      description: this.state.area.description,
      id: this.state.area.id,
      rooms: [],
    };
 
    let areaIndex = areaArray.findIndex((a) => a.areaId === this.state.area.id);
 
    if (areaIndex < 0) {
      // New, so create
      areaArray.push(area);
    } else {
      // Exists, so update
      areaArray[areaIndex] = area;
    }
 
    localStorage.setItem("legendary_saved_areas", JSON.stringify(areaArray));
 
    this.getSavedAreas();
    this.renderGrid();
  };
 
  updateArea = (name, author, description) => {
    if (name != undefined && name != null) {
      this.setState({
        area: {
          name: name,
          author: this.state.area.author,
          description: this.state.area.description,
          id: this.state.area.id,
        },
      });
    }
    if (author != undefined && author != null) {
      this.setState({
        area: {
          name: this.state.area.name,
          author: author,
          description: this.state.area.description,
          id: this.state.area.id,
        },
      });
    }
    if (description != undefined && description != null) {
      this.setState({
        area: {
          name: this.state.area.name,
          author: this.state.area.author,
          description: description,
          id: this.state.area.id,
        },
      });
    }
  };
 
  selectArea = (e) => {
    let areas = JSON.parse(localStorage.getItem("legendary_saved_areas"));
    let areaName = e.currentTarget.value;
    if (areaName != "New") {
      let area = areas.find((a) => a.name === areaName);
      if (area != undefined) {
        this.setState({ area: { id: area.id }, selectedArea: area }, () => {
          this.renderGrid();
        });
      } else {
        this.setState(
          { area: { id: this.state.area.id }, selectedArea: null },
          () => {
            this.renderGrid();
          }
        );
      }
    } else {
      this.setState(
        { area: { id: this.state.area.id }, selectedArea: null },
        () => {
          this.renderGrid();
        }
      );
    }
  };
 
  getSavedAreas = () => {
    let savedAreas = localStorage.getItem("legendary_saved_areas");
    let areas = [];
 
    if (savedAreas != null) {
      areas = JSON.parse(localStorage.getItem("legendary_saved_areas"));
    }
 
    let options = [];
    options.push(<option key={this.state.area.id}>New</option>);
    for (let x = 0; x < areas.length; x++) {
      options.push(<option key={areas[x].id}>{areas[x].name}</option>);
    }
 
    this.setState({ savedAreas: options });
  };
 
  tableGenerator = () => {
    let table = [];
    let areaId = this.state.area.id;
    for (let i = 0; i < 30; i++) {
      let children = [];
      for (let j = 0; j < 30; j++) {
        children.push(
          <td key={`cell-${i}-${j}`} className={styles.cell}>
            <Room key={areaId} areaId={areaId} x={j} y={i}></Room>
          </td>
        );
      }
      table.push(<tr key={`row-${i}`}>{children}</tr>);
    }
    return table;
  };
 
  submitForm(e) {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.saveArea();
    }
    this.setState({ validated: true });
  }
 
  copyToClipboard = () => {
    let text = JSON.stringify(this.state.outputJSON);
 
    if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return prompt("Copy to clipboard: Ctrl+C, Enter", text);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
 
  render() {
    return (
      <>
        <Form
          id="frmCreateEditArea"
          noValidate
          validated={this.state.validated}
          onSubmit={(e) => this.submitForm(e)}
        >
          <Row visible="false">
            <Col lg={2}>
              <Form.Select onChange={(e) => this.selectArea(e)}>
                {this.state.savedAreas}
              </Form.Select>
            </Col>
            <Col lg={2}>
              <Form.Control
                type="text"
                placeholder="Enter Area Name"
                required
                defaultValue={
                  this.state.selectedArea != null
                    ? this.state.selectedArea.name
                    : ""
                }
                onBlur={(e) => this.updateArea(e.target.value, null, null)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Col>
            <Col lg={1}>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                required
                defaultValue={
                  this.state.selectedArea != null
                    ? this.state.selectedArea.author
                    : ""
                }
                onBlur={(e) => this.updateArea(null, e.target.value, null)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an author.
              </Form.Control.Feedback>
            </Col>
            <Col lg={4}>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                required
                defaultValue={
                  this.state.selectedArea != null
                    ? this.state.selectedArea.description
                    : ""
                }
                onBlur={(e) => this.updateArea(null, null, e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Col>
            <Col lg={1}>
              <Form.Control
                type="text"
                readOnly
                placeholder="Area ID"
                value={
                  this.state.selectedArea != null
                    ? this.state.selectedArea.id
                    : this.state.area.id
                }
              />
            </Col>
            <Col lg={2}>
              <Button type="submit" className="primary">
                Save
              </Button>
              &nbsp;
              <Button className="secondary" onClick={this.generateJSON}>
                Generate
              </Button>
            </Col>
          </Row>
        </Form>
        <table className={styles.gridTable}>
          <tbody>{this.state.grid}</tbody>
        </table>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>
              Save Area as JSON
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea className={styles.textarea}>
              {JSON.stringify(this.state.outputJSON)}
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.copyToClipboard} variant="success">
              Copy to Clipboard
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
 
export default Grid;
