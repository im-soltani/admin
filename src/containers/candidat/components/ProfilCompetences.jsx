import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap";

class ProfilCompetences extends React.PureComponent {
  static propTypes = {
    competences: PropTypes.array,
    test: PropTypes.bool
  };

  render() {
    const { competences, test } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card--calendar">
            <Row
              className="Candidat-competences__row-header"
              style={{ textTransform: "uppercase" }}>
              {test ? "Compétences" : "Softskills"}
            </Row>
            <Row className="Candidat-competences__row">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {competences &&
                  competences.length > 0 &&
                  competences.map((item, index) => {
                    return (
                      <label key={index} className="Candidat-sticky">
                        {item}
                      </label>
                    );
                  })}
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfilCompetences;
