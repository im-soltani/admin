import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Icon from "../../../../shared/components/Icon";
const google = (window.google = window.google ? window.google : {});
class ProfilInfosBottom extends React.PureComponent {
  static propTypes = {
    entreprise: PropTypes.object.isRequired
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
              Adresse
            </Row>
            <p className="EntrepriseDetail-info-label__cion">
              <Icon className="EntrepriseDetail-icon" name="cv-map" />

              <span className="EntrepriseDetail-info-label">
                {entreprise.address ? entreprise.address : "--"}
              </span>
            </p>
            <div style={{ marginTop: 20 }}>
              <Map
                google={google}
                zoom={6}
                style={mapStyles}
                initialCenter={{
                  lat: entreprise.location.latitude,
                  lng: entreprise.location.longitude
                }}
              >
                <Marker
                  position={{
                    lat: entreprise.location.latitude,
                    lng: entreprise.location.longitude
                  }}
                />
              </Map>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
const mapStyles = {
  width: "92%",
  height: "235px"
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyDcKFvsU1JQQstKQGr5KlPAWiQcUAQW3bg"
})(ProfilInfosBottom);
