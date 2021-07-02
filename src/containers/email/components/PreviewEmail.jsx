import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Parser from "html-react-parser";
class PreviewEmail extends React.PureComponent {
  static propTypes = {
    template: PropTypes.string
  };

  render() {
    const { template } = this.props;
    return (
      <div>
        <Row className="Email-template__row-header">Apperçu</Row>
        <Row className="Email-template__row">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Parser(template)}
          </div>
        </Row>
      </div>
    );
  }
}

export default PreviewEmail;
