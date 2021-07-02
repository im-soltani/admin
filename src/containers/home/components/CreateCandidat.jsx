import React from "react";
import { Card, CardBody, Col, Label, Input } from "reactstrap";
import AddNewCV from "./AddNewCV";
import FileDrop from "react-file-drop";

class CreateCandidat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      file: null
    });
  }
  onFileChange = event => {
    if (event.target.files[0])
      this.setState({
        file: event.target.files[0],
        modal: true
      });
  };

  handleDrop = files => {
    this.setState({
      file: files[0],
      modal: true
    });
  };
  render() {
    const { modal, file } = this.state;
    return (
      <Col xs={12} md={6} lg={3} xl={3}>
        <AddNewCV modal={modal} file={file} toggle={this.toggle} />
        <Card>
          <FileDrop
            onDrop={this.handleDrop}
            draggingOverFrameClassName="dashed-upload"
          >
            <CardBody className="dashed-container">
              <span className="title">PARTAGEZ VOS CV</span>

              <span className="sub-title">glisser / déposer</span>
              <Input
                style={{ visibility: "hidden" }}
                id="cv"
                name="cv"
                type="file"
                accept="application/pdf"
                onChange={this.onFileChange}
              />
              <Label
                htmlFor="cv"
                className="btn btn-warning btn-lg round medium-padding text-white upload"
              >
                UPLOADER LE CV
              </Label>
            </CardBody>
          </FileDrop>
        </Card>
      </Col>
    );
  }
}

export default CreateCandidat;
