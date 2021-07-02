import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import {
  experienceConst,
  contratConst
} from "../../../handler/utils/constants";
import Icon from "../../../shared/components/Icon";

class ProfilInfosTop extends React.PureComponent {
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
              <Icon className="Candidat-icon" name="cv-envelope" />
              Email:{" "}
              <span className="Candidat-info-label">
                {candidat.profile.email}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-test" />
              Expérience:{" "}
              <span className="Candidat-info-label">
                {candidat &&
                candidat.experience &&
                candidat.experience.length > 0
                  ? experienceConst.filter(
                      exp => exp.value === candidat.experience
                    )[0].label
                  : "--"}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-brief" />
              Métier:{" "}
              <span className="Candidat-info-label">
                {candidat.jobs && candidat.jobs.length > 0
                  ? candidat.jobs[0]
                  : "--"}
              </span>
            </p>
            <p className="Candidat-info-label__cion">
              <Icon className="Candidat-icon" name="candidat-contract" />
              Contrat:{" "}
              <span className="Candidat-info-label">
                {candidat && candidat.contract && candidat.contract.length > 0
                  ? contratConst.filter(
                      exp => exp.value === candidat.contract
                    )[0].label
                  : "--"}
              </span>
            </p>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProfilInfosTop;
