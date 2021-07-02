import React from "react";
import PropTypes from "prop-types";
import { CardBody, ListGroup, Row, Col } from "reactstrap";
import ItemDetails from "../../../shared/components/ItemDetails";
import EditIcon from "mdi-react/EditIcon";
import Parser from "html-react-parser";
const logo = `${process.env.PUBLIC_URL}/img/images/placeholder.jpg`;
const bann = `${process.env.PUBLIC_URL}/img/images/banner.png`;

class EntrepriseInfo extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    handleChangeUpdate: PropTypes.func,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    className: "Profil",
    title: ""
  };
  state = {
    src: this.props.user.profile_pic_url ? this.props.user.profile_pic_url : logo,
    bannerr: this.props.user.banner ? this.props.user.banner : bann
  }
  _handleChangeUpdate = () => {
    this.props.handleChangeUpdate();
  };
  render() {
    const {
      user: {
        name,
        profile: { email },
        tel,
        application_email,
        name_of_in_charge,
        address_2,
        website,
        description,
        activity,
        effective,
        address
      }
    } = this.props;
    return (
      <CardBody>
        <div className="Profil-banner">
          <img className="img-banner_2"
            src={this.state.bannerr} alt={"bunner"}
            onError={() => { this.setState({ src: bann }) }}
          />
        </div>
        <div className="Profil-logo">
          <img
            className="Profil-logo__img"
            src={this.state.src}
            onError={() => { this.setState({ src: logo }) }}
            alt={"logo"}
          />
        </div>

        <ListGroup tag="div" className="Profil-group">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Nom de la société" value={name} />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails
                label="Nom, prénom du responsable"
                value={name_of_in_charge}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Adresse principal" value={address} />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Autre établissement" value={address_2} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Email principal" value={email} />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails
                label="Email de candidature"
                value={application_email}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Numéro de téléphone" value={tel} />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Site web" value={website} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Activité" array={true} value={activity} />
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label="Effectif" value={effective} />
            </Col>
          </Row>
          <Row style={{ marginBottom: 6 }}>
            <Col xs={12} md={12} lg={12} xl={12}>
              <ItemDetails
                label="Présentation de l'entreprise"
                value={description && Parser(description)}
              />
            </Col>
          </Row>
        </ListGroup>
        <div className="Button-add__div" title="Modifier">
          <span className="Button-add__btn" onClick={this._handleChangeUpdate}>
            <EditIcon className="Button-add__btn-icon" />
          </span>
        </div>
      </CardBody>
    );
  }
}

export default EntrepriseInfo;
