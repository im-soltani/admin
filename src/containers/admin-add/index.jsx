import React from "react";
import { Row, Container } from "reactstrap";
import AdminFormAdd from "./componenets/AdminFormAdd";

class AdminAdd extends React.PureComponent {
  render() {
    return (
      <Container className="dashboard">
        <Row>
          <AdminFormAdd />
        </Row>
      </Container>
    );
  }
}

export default AdminAdd;
