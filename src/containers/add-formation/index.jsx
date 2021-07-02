import React from "react";
import { Container, Row } from "reactstrap";
import OfferFormationForm from "./components/FormationForm";

const AddfORMATION = () => (
  <Container className="dashboard">
    <Row>
      <OfferFormationForm type={"add"} />
    </Row>
  </Container>
);

export default AddfORMATION;
