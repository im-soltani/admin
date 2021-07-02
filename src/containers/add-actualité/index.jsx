import React from "react";
import { Container, Row } from "reactstrap";
import ActualitéForm from "./components/actualitéForm";

const AddActualité = (data) => (
  <Container className="dashboard">
    <Row>
      <ActualitéForm data={data} />
    </Row>
  </Container>
);

export default AddActualité;
