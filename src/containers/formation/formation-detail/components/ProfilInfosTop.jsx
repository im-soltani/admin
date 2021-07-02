import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import Icon from "../../../../shared/components/Icon";
import * as moment from "moment";

class ProfilInfosTop extends React.PureComponent {
  static propTypes = {
    offer: PropTypes.object.isRequired
  };
  render() {
    const { offer } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card--calendar">
            <Row
              className="EntrepriseDetail-competences__row-header"
              style={{ textTransform: "uppercase" }}
            >
              Informations
            </Row>
            <p className="EntrepriseDetail-info-label__cion">
              {offer.state == "PUBLISHED" ? <div>
                <Icon className="EntrepriseDetail-icon" name="candidat-time" />
                Date de publication:{" "}
                <span className="EntrepriseDetail-info-label">
                  {moment(offer.publishedAt).format("DD/MM/YYYY")}
                </span>
              </div> : <div>
                  <Icon className="EntrepriseDetail-icon" name="candidat-time" />
                  Date de création:{" "}
                  <span className="EntrepriseDetail-info-label">
                    {moment(offer.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>}
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="candidat-time" />
                formation: du{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.startEducation).format("DD/MM/YYYY")}{" "}
              </span>
                au{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.endEducation).format("DD/MM/YYYY")}{" "}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="candidat-time" />
                Période en entreprise: du {" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.startInternship).format("DD/MM/YYYY")}{" "}
              </span>
                au{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.endInternship).format("DD/MM/YYYY")}{" "}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="candidat-time" />
                Candidatures: du {" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.startApply).format("DD/MM/YYYY")}{" "}
              </span>
                au{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.endApply).format("DD/MM/YYYY")}
              </span>
            </p>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfilInfosTop;
