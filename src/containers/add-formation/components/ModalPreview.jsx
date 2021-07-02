import React from "react";
import { Modal, ModalBody, Row, Col, Label } from "reactstrap";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Button from "../../../shared/components/Button";
import {
  BASE_URL
} from "../../../handler/utils/constants";
import * as moment from "moment";
class ModalPreview extends React.Component {
  static propTypes = {
    offer: PropTypes.object,
    getEntrepriseProfile: PropTypes.object.isRequired,
    toggleModal: PropTypes.func,
    modal: PropTypes.bool
  };

  static defaultProps = {
    offer: {},
    modal: false
  };

  constructor(props) {
    super(props);

    this.state = {
      offer: props.offer ? props.offer : {},
      modal: props.modal
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.offer !== this.props.offer)
      this.setState({ offer: nextProps.offer });
    if (nextProps.modal !== this.props.modal)
      this.setState({ modal: nextProps.modal });
  }

  render() {
    const { offer, modal } = this.state;
    const { toggleModal } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggleModal} className="ModalCV">
        <ModalBody>
          <Row className="OfferItemDetailHeader-nopadiing">
            <img
              src={
                BASE_URL + "/media/banners/banner.png"
              }
              className="OfferItemDetailHeader-banner"
            />
            <div className="OfferItemDetailHeader-opacity"> </div>
            <Col xs={6} md={3} lg={3} xl={3}>
              <img
                src={this.props.getEntrepriseProfile && this.props.getEntrepriseProfile.profile_pic_url}
                className="OfferItemDetailHeader-logo"
              />
            </Col>
            <Col
              xs={6}
              md={6}
              lg={6}
              xl={6}
              className="OfferItemDetailHeader-col__middle"
            >
              <div className="OfferItemDetailHeader-text headerText">
                {offer.name}
              </div>
              <div className="OfferItemDetailHeader-text">
                {offer.auteur}
              </div>
            </Col>
          </Row>
          <div
            style={{
              marginTop: "11rem",
              height: "15cm",
              borderBottom: "1px solid gray",
              overflow: "auto",
              marginBottom: 20
            }}
          >
            <Label className="OfferItemDetailHeader-label">Infos clés</Label>
            <Row
              className="OfferItemDetailHeader-row"
              style={{
                marginTop: 10
              }}
            >
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Type de la formation:{" "}
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span style={{ fontSize: 14 }}>{offer.typeFormation}</span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Formation :{" "}
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span style={{ fontSize: 14 }}>Du{" "}{moment(offer.startEducation).format("DD/MM/YYYY")}{" "}au{" "}{moment(offer.endEducation).format("DD/MM/YYYY")}</span>
              </Col>
            </Row>

            <Row className="OfferItemDetailHeader-row">
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Période en entreprise:
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                Du{" "} {offer.startInternship ? <span style={{ fontSize: 14 }}>{moment(offer.startInternship).format("DD/MM/YYYY")}</span> : null} {" au "} {moment(offer.endInternship).format("DD/MM/YYYY")}
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Candidatures :{" "}
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span style={{ fontSize: 14 }}>Du{" "}{moment(offer.startApply).format("DD/MM/YYYY")}{" "}au{" "}{moment(offer.endApply).format("DD/MM/YYYY")}</span>
              </Col>
            </Row>

            <Row className="OfferItemDetailHeader-row">
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Compétence(s) :{" "}
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                {offer.suggestions &&
                  offer.suggestions.map((activ, index) => (
                    <span key={index} style={{ fontSize: 14 }}>
                      {activ.name}{" "}
                      {index < offer.suggestions.length - 1 && ", "}
                    </span>
                  ))}
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                <span
                  style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}
                >
                  Métier(s) :{" "}
                </span>
              </Col>
              <Col xs={6} md={6} lg={3} xl={3}>
                {offer.jobsuggestions &&
                  offer.jobsuggestions.map((activ, index) => (
                    <span key={index} style={{ fontSize: 14 }}>
                      {activ.name}{" "}
                      {index < offer.jobsuggestions.length - 1 && ", "}
                    </span>
                  ))}
              </Col>
            </Row>
            <Label
              className="OfferItemDetailHeader-label"
              style={{ marginTop: "2rem" }}
            >
              Description de la formation
            </Label>
            {offer.description_poste && (
              <div
                style={{
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  paddingTop: 10
                }}
              >
                {Parser(offer.description_poste)}
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={toggleModal}
              className="Profil-btn__cancel"
              size="lg"
              text="Retour"
              color="secondary"
              loading={false}
            />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
const GET_ENTRPRISE = gql`
  query getEntrepriseProfile {
    getEntrepriseProfile {
      name
      profile_pic_url
    }
  }
`;
export default graphql(GET_ENTRPRISE, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data: { loading, error, getEntrepriseProfile } }) => ({
    loading,
    error,
    getEntrepriseProfile
  })
})(ModalPreview);
