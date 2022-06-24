import React, { Component } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import classNames from "classnames";
import styles from "../components/room.module.css";
 
export class Room extends Component {
  state = {
    show: false,
    selectedRoom: null,
    active: false,
    upToRoom: 0,
    downToRoom: 0,
    validated: false,
    areaId: this.props.areaId,
    roomId:
      this.props.areaId.toString() +
      this.props.x.toString() +
      this.props.y.toString(),
  };
 
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
  }
 
  componentDidMount() {
    this.loadRoom();
  }
 
  // convertAndSaveImage = (e) => {
  //   const file = e.target.files[0];
  // };
 
  readAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
          resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
 
  convertAndSaveImage = (e) => {
    let room = this.state.selectedRoom;
    Promise.all(Array.from(e.target.files).map(this.readAsDataURL))
      .then((result) => {
        room.image = result[0];
        this.setState({selectedRoom: room});
      })
      .catch((error) => { console.log(error)});
  };
 
  uploadImage = () => {
    this.inputFile.current.click();
  };
 
  showModal = () => {
    this.setState({ show: true });
  };
 
  hideModal = () => {
    let room = this.state.selectedRoom;
 
    if (room != null && room.roomId != null) {
      this.setState({ show: false });
    } else {
      this.setState({ selectedRoom: null, show: false });
    }
  };
 
  loadRoom() {
    let areas = JSON.parse(localStorage.getItem("legendary_saved_areas"));
 
    if (areas != null) {
      // Should never be null
      let area = areas.find((a) => a.id === this.state.areaId);
 
      if (area != undefined && area.rooms != null && area.rooms.length > 0) {
        let room = area.rooms.find((r) => r.roomId === this.state.roomId);
        if (room != undefined) {
          // We have a valid so let's see if we need to set the upToRoom/downToRoom exits.
          if (room.exits != null && room.exits.length > 0) {
            for (let x = 0, exit; (exit = room.exits[x]); x++) {
              if (exit.dir === "exitUp") {
                this.setState({ upToRoom: exit.to });
              } else if (exit.dir === "exitDown") {
                this.setState({ downToRoom: exit.to });
              }
            }
          }
 
          // This is the ONLY place, outside of the initial state, where roomID gets set!
          this.setState({ selectedRoom: room, roomId: room.roomId });
        } else {
          this.setState({ selectedRoom: null });
        }
      } else {
        this.setState({ selectedRoom: null });
      }
    }
  }
 
  calculateToRoom(dir) {
    let yCoord = this.props.y;
    let xCoord = this.props.x;
 
    switch (dir) {
      case "exitUp":
        return this.state.upToRoom;
      case "exitDown":
        return this.state.downToRoom;
      case "exitNorth":
        yCoord = this.props.y === 0 ? 30 : this.props.y - 1;
        break;
      case "exitSouth":
        yCoord = this.props.y === 30 ? 0 : this.props.y + 1;
        break;
      case "exitEast":
        xCoord = this.props.x === 30 ? 0 : this.props.x + 1;
        break;
      case "exitWest":
        xCoord = this.props.x === 0 ? 30 : this.props.x - 1;
        break;
      case "exitNE":
        xCoord = this.props.x === 0 ? 30 : this.props.x + 1;
        yCoord = this.props.y === 0 ? 30 : this.props.y - 1;
 
        break;
      case "exitNW":
        yCoord = this.props.y === 30 ? 0 : this.props.y + 1;
        break;
      case "exitSE":
        xCoord = this.props.x === 30 ? 0 : this.props.x + 1;
        break;
      case "exitSW":
        xCoord = this.props.x === 0 ? 30 : this.props.x - 1;
        break;
    }
 
    return this.state.areaId.toString() + xCoord.toString() + yCoord.toString();
  }
 
  toggleExit = (e, dir) => {
    const checked = e === true ? true : e.target.checked;
 
    if (this.state.selectedRoom === null) {
      this.state.selectedRoom = { exits: [] };
    }
 
    let array =
      this.state.selectedRoom.exits != null
        ? this.state.selectedRoom.exits
        : [];
 
    let exit = {
      dir: dir,
      to: this.calculateToRoom(dir),
    };
 
    if (checked === true) {
      let obj = array.find((a) => a.dir === dir);
      if (obj === undefined) {
        array.push(exit);
      }
    } // Keep everything but this direction
    else {
      array = array.filter((a) => a.dir != dir);
    }
    let room = this.state.selectedRoom;
    if (room === null) {
      room = { exits: [] };
    }
    room.exits = array;
    this.setState({ selectedRoom: room });
  };
 
  setTerrain = (e) => {
    let room = this.state.selectedRoom;
    if (room === null) {
      room = {};
    }
    room.terrain = e.target.value;
    this.setState({ selectedRoom: room });
  };
 
  updateRoomAttribs = (nameSender, descSender, imageSender) => {
    let room = this.state.selectedRoom;
    if (room === null) {
      room = {};
    }
 
    if (nameSender != null) {
      room.name = nameSender.currentTarget.value;
    }
    if (descSender != null) {
      room.description = descSender.currentTarget.value;
    }
    if (imageSender != null) {
      room.image = imageSender.currentTarget.value;
    }
 
    this.setState({ selectedRoom: room });
  };
 
  toggleFlags = (e) => {
    let room = this.state.selectedRoom;
    if (room === null) {
      room = { flags: [] };
    }
 
    const checked = e.target.checked;
    const flagName = e.target.id;
    let array =
      this.state.selectedRoom.flags != null
        ? this.state.selectedRoom.flags
        : [];
 
    if (checked === true) {
      let obj = array.find((a) => a === flagName);
      if (obj === undefined) {
        array.push(flagName);
      }
    } // Keep everything but this flag
    else {
      array = array.filter((a) => a != flagName);
    }
 
    room.flags = array;
 
    this.setState({ selectedRoom: room });
  };
 
  saveChanges = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      let areas = localStorage.getItem("legendary_saved_areas");
 
      if (areas === null) {
        localStorage.setItem("legendary_saved_areas", JSON.stringify([]));
      }
 
      let areaArray = JSON.parse(localStorage.getItem("legendary_saved_areas"));
 
      let areaIndex = areaArray.findIndex((a) => a.id === this.props.areaId);
 
      if (areaIndex < 0) {
        // Area not saved, prompt
        this.setState({ active: true, show: false });
        alert("Please save your new area before saving rooms.");
        return;
      } else {
        // Area exists, so add or update the room
        let area = areaArray[areaIndex];
 
        let roomIndex = area.rooms.findIndex(
          (r) => r.roomId === this.state.roomId
        );
 
        let room = this.state.selectedRoom;
        room.roomId = this.state.roomId;
 
        if (roomIndex < 0) {
          // Doesn't exist yet
          areaArray[areaIndex].rooms.push(room);
        } else {
          // Exists, so update
          areaArray[areaIndex].rooms[roomIndex] = room;
        }
 
        this.setState({ selectedRoom: room });
      }
 
      localStorage.setItem("legendary_saved_areas", JSON.stringify(areaArray));
 
      this.setState({ active: true, show: false });
    }
 
    this.setState({ validated: true });
  };
 
  hasExit(dir) {
    let room = this.state.selectedRoom;
    let exits = room != null ? room.exits : null;
 
    if (exits != null) {
      let obj = exits.find((e) => e.dir === dir);
      if (obj != null && obj != undefined) {
        return true;
      }
    }
 
    return false;
  }
 
  deleteRoom = () => {
    let room = this.state.selectedRoom;
    let result = confirm("Delete?");
 
    if (result === true) {
      let areaArray = JSON.parse(localStorage.getItem("legendary_saved_areas"));
      let areaIndex = areaArray.findIndex((a) => a.id === this.props.areaId);
 
      let area = areaArray[areaIndex];
 
      let roomIndex = area.rooms.findIndex((r) => r.roomId === room.roomId);
 
      if (roomIndex > 0) {
        areaArray[areaIndex].rooms.splice(roomIndex, 1);
        localStorage.setItem(
          "legendary_saved_areas",
          JSON.stringify(areaArray)
        );
        this.setState({ selectedRoom: null });
      }
 
      this.hideModal();
    }
  };
 
  hasFlag(flag) {
    let room = this.state.selectedRoom;
    let flags = room != null ? room.flags : null;
 
    if (flags != null) {
      let obj = flags.find((e) => e === flag);
      if (obj != null && obj != undefined) {
        return true;
      }
    }
 
    return false;
  }
 
  render() {
    let room = this.state.selectedRoom;
    let exits = room != null ? room.exits : null;
    let terrain = room != null ? room.terrain : "City";
 
    var roomDivClass = classNames({
      roomContainer: room === null,
      roomContainerActive: room != null,
      exitNorth:
        exits != null
          ? room.exits.find((e) => e.dir === "exitNorth") != undefined
          : false,
      exitSouth:
        exits != null
          ? room.exits.find((e) => e.dir === "exitSouth") != undefined
          : false,
      exitEast:
        exits != null
          ? room.exits.find((e) => e.dir === "exitEast") != undefined
          : false,
      exitWest:
        exits != null
          ? room.exits.find((e) => e.dir === "exitWest") != undefined
          : false,
      exitUp:
        exits != null
          ? room.exits.find((e) => e.dir === "exitUp") != undefined
          : false,
      exitDown:
        exits != null
          ? room.exits.find((e) => e.dir === "exitDown") != undefined
          : false,
      exitNE:
        exits != null
          ? room.exits.find((e) => e.dir === "exitNE") != undefined
          : false,
      exitNW:
        exits != null
          ? room.exits.find((e) => e.dir === "exitNW") != undefined
          : false,
      exitSE:
        exits != null
          ? room.exits.find((e) => e.dir === "exitSE") != undefined
          : false,
      exitSW:
        exits != null
          ? room.exits.find((e) => e.dir === "exitSW") != undefined
          : false,
    });
    return (
      <>
        <div className={roomDivClass} onClick={() => this.showModal()}></div>
 
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title className={styles.modalTitle}>
              Area: {this.props.areaId} Room: {this.state.roomId} (
              {this.props.x},{this.props.y})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form
                id="frmCreateEditRoom"
                noValidate
                validated={this.state.validated}
                onSubmit={(e) => {
                  this.saveChanges(e);
                }}
              >
                <Row className={styles.formRow}>
                  <Form.Control
                    type="text"
                    className={styles.roomTitle}
                    placeholder="Enter Room Name"
                    required
                    defaultValue={
                      this.state.selectedRoom != null
                        ? this.state.selectedRoom.name
                        : ""
                    }
                    onBlur={(e) => this.updateRoomAttribs(e, null, null)}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a title.
                  </Form.Control.Feedback>
                </Row>
                <Row className={styles.formRow}>
                  <Form.Control
                    as="textarea"
                    className={styles.textArea}
                    placeholder="Enter Room Description"
                    defaultValue={
                      this.state.selectedRoom != null
                        ? this.state.selectedRoom.description
                        : ""
                    }
                    onBlur={(e) => this.updateRoomAttribs(null, e, null)}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a description.
                  </Form.Control.Feedback>
                </Row>
                <Row className={styles.formRow}>
                  <Form.Control
                    as="textarea"
                    className={styles.textArea}
                    placeholder="Enter Room Base-64 Image"
                    defaultValue={
                      this.state.selectedRoom != null
                        ? this.state.selectedRoom.image
                        : ""
                    }
                    onBlur={(e) => this.updateRoomAttribs(null, null, e)}
                  ></Form.Control>
                  <input
                    type="file"
                    onChange={this.convertAndSaveImage}
                    className={styles.upload}
                    ref={this.inputFile}
                  />
                  <Button
                    variant="success"
                    className={styles.uploadButton}
                    onClick={this.uploadImage}
                  >
                    Upload and Convert Image
                  </Button>
                </Row>
 
                <Row className={styles.formRow}>
                  <Col>
                    <Form.Check
                      type="switch"
                      id="exit-north"
                      label="Exit North"
                      defaultChecked={this.hasExit("exitNorth")}
                      onChange={(e) => this.toggleExit(e, "exitNorth")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-south"
                      label="Exit South"
                      defaultChecked={this.hasExit("exitSouth")}
                      onChange={(e) => this.toggleExit(e, "exitSouth")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-east"
                      label="Exit East"
                      defaultChecked={this.hasExit("exitEast")}
                      onChange={(e) => this.toggleExit(e, "exitEast")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-west"
                      label="Exit West"
                      defaultChecked={this.hasExit("exitWest")}
                      onChange={(e) => this.toggleExit(e, "exitWest")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-up"
                      label="Exit Up"
                      defaultChecked={this.hasExit("exitUp")}
                      onChange={(e) => this.toggleExit(e, "exitUp")}
                    />
                    <Form.Control
                      type="text"
                      className={styles.roomTitle}
                      placeholder="Up To Room"
                      defaultValue={this.state.upToRoom}
                      onBlur={(e) => {
                        this.setState({ upToRoom: e.target.value }, () => {
                          this.toggleExit(true, "exitUp");
                        });
                      }}
                    ></Form.Control>
                    <Form.Check
                      type="switch"
                      id="exit-down"
                      label="Exit Down"
                      defaultChecked={this.hasExit("exitDown")}
                      onChange={(e) => this.toggleExit(e, "exitDown")}
                    />
                    <Form.Control
                      type="text"
                      className={styles.roomTitle}
                      placeholder="Down To Room"
                      defaultValue={this.state.downToRoom}
                      onBlur={(e) => {
                        this.setState({ downToRoom: e.target.value }, () => {
                          this.toggleExit(true, "exitDown");
                        });
                      }}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Check
                      type="switch"
                      id="exit-NE"
                      label="Exit NE"
                      defaultChecked={this.hasExit("exitNE")}
                      onChange={(e) => this.toggleExit(e, "exitNE")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-NW"
                      label="Exit NW"
                      defaultChecked={this.hasExit("exitNW")}
                      onChange={(e) => this.toggleExit(e, "exitNW")}
                    />
                    <Form.Check
                      type="switch"
                      id="exit-SE"
                      label="Exit SE"
                      defaultChecked={this.hasExit("exitSE")}
                      onChange={(e) => this.toggleExit(e, "exitSE")}
                    />
                    <Form.Check
                      type="switch"
                      label="Exit SW"
                      defaultChecked={this.hasExit("exitSW")}
                      onChange={(e) => this.toggleExit(e, "exitSW")}
                    />
                    <Form.Check
                      type="switch"
                      id="flag-indoors"
                      label="Indoors"
                      defaultChecked={this.hasFlag("flag-indoors")}
                      onChange={(e) => this.toggleFlags(e)}
                    />
                    <Form.Check
                      type="switch"
                      id="flag-dark"
                      label="Dark"
                      defaultChecked={this.hasFlag("flag-dark")}
                      onChange={(e) => this.toggleFlags(e)}
                    />
                    <Form.Select
                      defaultValue={terrain}
                      onChange={(e) => this.setTerrain(e)}
                    >
                      <option key="0">City</option>
                      <option key="1">Mountains</option>
                      <option key="2">Hills</option>
                      <option key="3">Grasslands</option>
                      <option key="4">Water</option>
                      <option key="5">Swamp</option>
                      <option key="6">Air</option>
                      <option key="7">Beach</option>
                      <option key="8">Ethereal</option>
                      <option key="9">Forest</option>
                      <option key="10">Jungle</option>
                      <option key="11">Desert</option>
                    </Form.Select>
                  </Col>
                </Row>
 
                <Row className={styles.formFooter}>
                  <Col>
                    <Button variant="secondary" onClick={this.hideModal}>
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={this.deleteRoom}>
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="float-end"
                      type="submit"
                      variant="primary"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
 
export default Room;
