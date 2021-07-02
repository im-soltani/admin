import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Parser from "html-react-parser";
class Description extends React.PureComponent {
  static propTypes = {
    description: PropTypes.string
  };

  render() {
    const { description } = this.props;
    return (
      <div>
        <Row className="EntrepriseDetail-letter__row">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {description && Parser(description)}
          </div>
        </Row>
      </div>
    );
  }
}

export default Description;
