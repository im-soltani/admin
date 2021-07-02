import React from "react";
import { Row, Card, Col } from "reactstrap";
import PropTypes from "prop-types";

class Content extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { className } = this.props;
    return (
      <Row className={`container-fluid__content ${className}`.trim()}>
        <Col sm="12">
          <Card>{this.props.children}</Card>
        </Col>
      </Row>
    );
  }
}

export default Content;
