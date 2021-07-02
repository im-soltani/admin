import React from "react";

import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import "moment/locale/fr";

class ProfileMain extends React.PureComponent {
  static propTypes = {
    entreprise: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired
  };

  render() {
    const { entreprise } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card--calendar">
            <Row
              className="EntrepriseDetail-competences__row-header"
              style={{ textTransform: "uppercase" }}
            >
              Entreprise
            </Row>
            <div className="profile__information">
              <div className="profile__avatar">
                {entreprise.profile_pic_url ? (
                  <img src={entreprise.profile_pic_url} alt="avatar" />
                ) : (
                  <div className={"EntrepriseDetail-letters-div"}>
                    <div className="EntrepriseDetail-letters">
                      {`${`${entreprise.name.charAt(0)}`}`.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <div className="profile__data">
                <p className="profile__name"> {entreprise.name}</p>
                <p className="profile__contact">
                  Administrateur:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {entreprise.name_of_in_charge}
                  </span>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfileMain;
