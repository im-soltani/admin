/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Parser from "html-react-parser";
class PreviewLetter extends React.PureComponent {
  static propTypes = {
    template: PropTypes.string
  };

  render() {
    const { template } = this.props;

    const newTemplate =
      template && template.replace("<p>", "<p style=\"font-size: 18px;\">"); // prettier-ignore
    return (
      <div>
        <Row className="Profil-group__label">Apperçu</Row>
        <Row className="Email-template__row">
          <div>{newTemplate && Parser(newTemplate)}</div>
        </Row>
      </div>
    );
  }
}

export default PreviewLetter;
