import React from "react";
import { Container, Row } from "reactstrap";
import OfferForm from "./components/OfferForm";

const AddOffer = () => (
  <Container className="dashboard">
    <Row>
      <OfferForm type={"add"} />
    </Row>
  </Container>
);

export default AddOffer;
