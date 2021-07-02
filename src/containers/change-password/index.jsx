import React from "react";
import { Row, Container } from "reactstrap";
import ChangePassword from "./components/ChangePassword";

class ForgotPassword extends React.PureComponent {
  render() {
    return (
      <Container className="dashboard">
        <Row>
          <ChangePassword />
        </Row>
      </Container>
    );
  }
}

export default ForgotPassword;
