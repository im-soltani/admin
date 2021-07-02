import React from "react";
import CandidatsListComponent from "./components/CandidatsListComponent";
import { Container, Row } from "reactstrap";

class CandidatsList extends React.PureComponent {
  render() {
    return (
      <Container className="dashboard">
        <Row>
          <CandidatsListComponent />
        </Row>
      </Container>
    );
  }
}

export default CandidatsList;
