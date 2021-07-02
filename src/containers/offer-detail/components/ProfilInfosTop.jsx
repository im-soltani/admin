import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import Icon from "../../../shared/components/Icon";
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
              <Icon className="EntrepriseDetail-icon" name="candidat-time" />
              Date de création:{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.createdAt).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="candidat-time" />
              Date d'expiration:{" "}
              <span className="EntrepriseDetail-info-label">
                {moment(offer.expiredAt).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="cv-map" />
              Adresse:{" "}
              <span className="EntrepriseDetail-info-label">
                {offer.address
                  ? offer.address
                  : offer.entreprise && offer.entreprise.address
                    ? offer.entreprise.address
                    : "--"}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="offer-num-app" />
              Candidatures en attente:{" "}
              <span className="EntrepriseDetail-info-label">
                {offer.all_application_number
                  ? offer.all_application_number
                  : 0}
              </span>
            </p>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon
                className="EntrepriseDetail-icon"
                name="candidat-contract"
              />
              Contrat:{" "}
              <span className="EntrepriseDetail-info-label">
                {offer.contract ? offer.contract : "--"}
              </span>
            </p>
            {offer.dureeContract &&
              <p className="EntrepriseDetail-info-label__cion">
                <Icon
                  className="EntrepriseDetail-icon"
                  name="candidat-contract"
                />
                Durée du contrat:{" "}
                <span className="EntrepriseDetail-info-label">
                  {offer.dureeContract} mois
                  </span>
              </p>}
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="offer-salary" />
              Salaire:{" "}
              <span className="EntrepriseDetail-info-label">
                {offer.salary_type === "Préciser le salaire (en KE)"
                  ? "Entre " +
                  offer.salary[0] +
                  " (KE) et " +
                  offer.salary[1] +
                  " (KE)"
                  : offer.salary_type}
              </span>
            </p>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfilInfosTop;
