import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";
import { experienceConst, BASE_URL } from "../../../handler/utils/constants";
import Button from "../../../shared/components//Button";
import Icon from "../../../shared/components//Icon";
import ShareCandidat from "./ShareCandidat";
import AssociateCandidat from "./AssociateCandidat";
import * as moment from "moment";
import Alert from "../../../handler/utils/Alert";
import CVPreview from "./CVPreview";
import DownloadCandidat from "./DownloadCandidat";
import SendEmail from "./SendEmail";
const logo = `${process.env.PUBLIC_URL}/img/images/placeholder.jpg`;

class CandidatItem extends React.PureComponent {
  static propTypes = {
    candidat: PropTypes.object,
    shared: PropTypes.bool
  };

  static defaultProps = {
    candidat: {},
    shared: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      modalDownload: false,
      modalAssociate: false,
      modalCV: false,
      src: BASE_URL + props.candidat.profile_pic_url

    };
    this.toggleAssociate = this.toggleAssociate.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    this.toggleDownload = this.toggleDownload.bind(this);
    this.toggleCV = this.toggleCV.bind(this);
    this.toggleSend = this.toggleSend.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }

  toggleAssociate() {
    this.setState({
      modalAssociate: !this.state.modalAssociate
    });
  }

  toggleShare() {
    this.setState({
      modalShare: !this.state.modalShare
    });
  }
  toggleDownload() {
    this.setState({
      modalDownload: !this.state.modalDownload
    });
  }

  toggleCV() {
    this.setState({
      modalCV: !this.state.modalCV
    });
  }

  toggleSend() {
    this.setState({
      modalSend: !this.state.modalSend
    });
  }
  onOpenModal = action => {
    if (action === "share") {
      if (this.props.candidat.sharedcv) {
        Alert.warning("Vous avez déjà partagé ce candidat.");
      } else this.setState({ modalShare: !this.state.modalShare });
    }
    if (action === "download") {
      let get = false;
      this.props.candidat.entreprises.map(entreprise => {
        if (entreprise.id === localStorage.getItem("id")) {
          get = true;
          Alert.warning("Vous avez déjà ce candidat dans vos cv.");
        }
      });
      if (get === false) {
        this.setState({ modalDownload: !this.state.modalDownload });
      }
    }
    if (action === "associate") {
      this.setState({ modalAssociate: !this.state.modalAssociate });
    }
    if (action === "cv") {
      this.setState({ modalCV: !this.state.modalCV });
    }
  };
  message = () => {
    Alert.warning("Le système d'envoi d'emails n'est pas encore fonctionnel.");
  };
  getNote = entreprises => {
    let rating = 0;
    if (entreprises) {
      entreprises.map(ele => {
        rating = ele.rating + rating;
      });

      return Math.trunc(rating / entreprises.length);
    } else return rating;
  };
  getRecived = candidat => {
    let recieved = false;
    if (candidat && candidat.entreprises) {
      candidat.entreprises.map(ele => {
        if (ele.id.toString() === localStorage.getItem("id")) {
          recieved = ele.recieved;
        }
      });

      return recieved;
    } else return recieved;
  };

  render() {
    const { candidat } = this.props;
    const {
      modalAssociate,
      modalShare,
      modalCV,
      modalDownload,
      modalSend
    } = this.state;

    return (
      <Container key={candidat._id} className="MyCV">
        <ShareCandidat
          modal={modalShare}
          toggle={this.toggleShare}
          id={candidat._id}
          recieved={this.getRecived(candidat)}
        />
        <DownloadCandidat
          modal={modalDownload}
          toggle={this.toggleDownload}
          id={candidat._id}
        />
        <CVPreview
          file={BASE_URL + candidat.cv}
          modal={modalCV}
          toggle={this.toggleCV}
        />
        <AssociateCandidat
          modal={modalAssociate}
          toggle={this.toggleAssociate}
          id={candidat._id}
        />
        <SendEmail
          modal={modalSend}
          toggle={this.toggleSend}
          id={candidat._id}
        />
        <Row>
          <Col md={6} lg={6} xl={5} sx={12} style={{ display: "flex" }}>
            <Col md={3} lg={3} xl={3} sx={12} className="MyCV-div__profile">
              {candidat.profile_pic_url &&
                candidat.profile_pic_url !== "undefined" ? (
                  <img
                    className={"MyCV-profile"}
                    src={this.state.src}
                    onError={() => { this.setState({ src: logo }) }}
                    alt={`${candidat.last_name}`}
                  />
                ) : (
                  <div className={"MyCV-letters-div"}>
                    <div className="MyCV-letters">
                      {`${`${candidat.last_name.charAt(
                        0
                      )}${candidat.first_name.charAt(0)}`}`.toUpperCase()}
                    </div>
                  </div>
                )}
            </Col>
            <Col md={9} lg={9} xl={9} sx={12} className="MyCV-middle">
              <span className="MyCV-label__name">
                <Link to={`/candidat/${candidat.num}`}>
                  {candidat.first_name + " " + candidat.last_name}
                </Link>
              </span>
              {candidat.jobs && candidat.jobs.length > 0 && <br />}
              {candidat.jobs && candidat.jobs.length > 0 && (
                <span className="MyCV-label" style={{ color: "#426cc1" }}>
                  {candidat.jobs[0]}
                </span>
              )}
              {candidat &&
                candidat.experience &&
                candidat.experience.length > 0 && <br />}
              {candidat &&
                candidat.experience &&
                candidat.experience.length > 0 && (
                  <span className="MyCV-label">
                    Expérience :{" "}
                    <span className="MyCV-label" style={{ color: "#426cc1" }}>
                      {
                        experienceConst.filter(
                          exp => exp.value === candidat.experience
                        )[0].label
                      }
                    </span>
                  </span>
                )}
              {candidat.disponibility && <br />}
              {candidat.disponibility && (
                <span className="MyCV-label">
                  Disponibilité :{" "}
                  <span className="MyCV-label" style={{ color: "#426cc1" }}>
                    {moment(candidat.disponibility)
                      .startOf("day")
                      .diff(moment().startOf("day"), "days") > 0
                      ? " Dans " +
                      moment(candidat.disponibility)
                        .startOf("day")
                        .diff(moment().startOf("day"), "days") +
                      " jours"
                      : " Immédiate"}
                  </span>
                </span>
              )}
              <br />
              {candidat.city && (
                <span className="MyCV-label__city">
                  <Icon className="MyCV-map" name="cv-map" />
                  {candidat.city}
                </span>
              )}
            </Col>
          </Col>
          <Col md={6} lg={6} xl={4} sx={12} style={{ margin: "auto" }}>
            <Row md={2} style={{ marginBottom: "1rem" }}>
              {candidat.is_blocked && <span className="blocked">Pas à l'écoute du marché</span>}
            </Row>
            <Row md={12}>
              {candidat.competences && candidat.competences.length > 0 ? (
                <div
                  style={{ display: "flex", flexWrap: "wrap" }}
                  className="MyCV-marginTopButtom">
                  {candidat.competences &&
                    candidat.competences.length > 0 &&
                    candidat.competences.map((item, index) => {
                      return (
                        <label key={index} className="MyCV-sticky">
                          {item}
                        </label>
                      );
                    })}
                </div>
              ) : (
                  <div
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      backgroundColor: "#f1f1f1",
                      padding: "5px 0px",
                      color: "#a2a2a2",
                      borderRadius: 24,
                      width: "85%"
                    }}
                    className="MyCV-marginTopButtom">
                    Aucune compétence ajoutée
                  </div>
                )}
            </Row>
          </Col>
          <Col
            md={9}
            lg={9}
            xl={2}
            sx={12}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              textAlign: "center",
              alignItems: "center",
              padding: "0px 6px",
              fontFamily: "Montserrat "
            }}>
            <div style={{ fontFamily: "Montserrat " }}>
              <Button
                className="MyCV-btn__cv"
                size="lg"
                text="Aperçu du CV"
                color="primary"
                style={{ padding: 10 }}
                onClick={() => this.onOpenModal("cv")}
              />
              {candidat.sharedcv && candidat.sharedby
                ? candidat.sharedby === "Diffusés par l'équipe DL"
                  ? "Diffusé par DL"
                  : candidat.sharedby === "Partagés par les adhérents"
                    ? "Partagé par les adhérents"
                    : "Candidature spontanée"
                : ""}
              <br />
              {candidat.sharedcv && candidat.sharedAt && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    marginTop: 5,
                    color: "#295ebe",
                    fontWeight: 500
                  }}>
                  Partagé le {moment(candidat.sharedAt).format("DD/MM/YYYY")}
                </span>
              )}
            </div>
          </Col>

          <Col md={3} lg={3} xl={1} sx={12} className="MyCV-buttons">
            {!candidat.is_blocked && (
              <div style={{ display: "contents" }}>
                {candidat.sharedcv ? (
                  <button
                    title="Ajouter à mes cv"
                    className="MyCV-btn__top"
                    onClick={() => this.onOpenModal("download")}>
                    <Icon className="MyCV-arrow-up" name="cv-arrow-down" />
                  </button>
                ) : (
                    <button
                      title="Partager"
                      className="MyCV-btn__top"
                      onClick={() => this.onOpenModal("share")}>
                      <Icon className="MyCV-arrow-up" name="cv-arrow-up" />
                    </button>
                  )}
                <button
                  title="Contacter"
                  className="MyCV-btn__middle"
                  onClick={() => this.toggleSend()}>
                  <Icon className="MyCV-envelope" name="cv-envelope" />
                </button>
                <button
                  title="Associer à une offre"
                  className="MyCV-btn__bottom"
                  onClick={() => this.onOpenModal("associate")}>
                  <Icon className="MyCV-link" name="cv-link" />
                </button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CandidatItem;
