import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Parser from "html-react-parser";
class ProfilLetter extends React.PureComponent {
  static propTypes = {
    letter: PropTypes.array
  };

  render() {
    const { letter } = this.props;
    return (
      <div style={{ marginTop: "2rem" }}>
        <Row className="Candidat-letter__row">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {letter && Parser(letter)}
          </div>
        </Row>
      </div>
    );
  }
}

export default ProfilLetter;
