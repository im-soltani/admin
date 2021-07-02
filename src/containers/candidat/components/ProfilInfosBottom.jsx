import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import * as moment from "moment";
import "moment/locale/fr";
import { etudeConst } from "../../../handler/utils/constants";
import Icon from "../../../shared/components/Icon";

class ProfilInfosBottom extends React.PureComponent {
  static propTypes = {
    candidat: PropTypes.object.isRequired
  };
  render() {
    const { candidat } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card--calendar">
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-tel" />
              Téléphone:{" "}
              <span className="Candidat-info-label">
                {candidat.tel ? candidat.tel : "--"}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-time" />
              Disponibilité:{" "}
              <span className="Candidat-info-label">
                {candidat.disponibility
                  ? moment(candidat.disponibility)
                      .startOf("day")
                      .diff(moment().startOf("day"), "days") > 0
                    ? " Dans " +
                      moment(candidat.disponibility)
                        .startOf("day")
                        .diff(moment().startOf("day"), "days") +
                      " jours"
                    : " Immédiate"
                  : " --"}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-etude" />
              Niveau d'étude:{" "}
              <span className="Candidat-info-label">
                {candidat && candidat.etude && candidat.etude.length > 0
                  ? etudeConst.filter(exp => exp.value === candidat.etude)[0]
                      .label
                  : " --"}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="cv-map" />
              Adresse:{" "}
              <span className="Candidat-info-label">
                {candidat.address ? candidat.address : "--"}
              </span>
              
            </p>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfilInfosBottom;
