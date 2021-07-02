import React from "react";
import MyCandidatsListComponent from "./components/MyCandidatsListComponent";
import { Container, Row } from "reactstrap";

class MyCandidatsList extends React.PureComponent {
  render() {
    return (
      <Container className="dashboard">
        <Row>
          <MyCandidatsListComponent />
        </Row>
      </Container>
    );
  }
}

export default MyCandidatsList;
