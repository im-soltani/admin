import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap";

class ProfilCompetences extends React.PureComponent {
  static propTypes = {
    competences: PropTypes.array,
    title: PropTypes.string
  };
  static defaultProps = {
    fromApp: false,
    title: "Compétences"
  };
  render() {
    const { competences, title } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card--calendar">
            <Row
              className="EntrepriseDetail-competences__row-header"
              style={{ textTransform: "uppercase" }}>
              {title}
            </Row>
            <Row className="EntrepriseDetail-competences__row">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {competences &&
                  competences.length > 0 &&
                  competences.map(item => {
                    return (
                      <label key={item.id} className="EntrepriseDetail-sticky">
                        {item.name}
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
