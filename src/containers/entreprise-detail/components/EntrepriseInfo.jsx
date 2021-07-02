import React from "react";
import PropTypes from "prop-types";
import { CardBody, ListGroup, Row, Col } from "reactstrap";
import ReactPlayer from "react-player/youtube"
import Button from "../../../shared/components/Button";
import Parser from "html-react-parser";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import ItemDetails from "../../../shared/components/ItemDetails";
import { UPDATE_USER_STATUS, GET_ENTREPRISES } from "../../../handler/queries";
import Alert from "../../../handler/utils/Alert";
import EditIcon from "mdi-react/EditIcon";
const logo = `${process.env.PUBLIC_URL}/img/images/placeholder.jpg`;
class EntrepriseInfo extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    handleChangeUpdate: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    updateUserStatus: PropTypes.func,
    refetch: PropTypes.func,
    removeEntreprise: PropTypes.func,
    removeUserFromEntreprise: PropTypes.func,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: "Profil",
    title: ""
  };
  state = {
    src: this.props.user.profile_pic_url ? this.props.user.profile_pic_url : logo
  }
  _handleRemove = () => {
    confirmAlert({
      title: "Demande de suppression de votre compte",
      message:
        "Etes-vous sur de vouloir supprimer ce compte ainsi que l'ensemble des informations vous concernant (cette action est irréversible et vous déconnectera automatiquement).",
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            this.props
              .removeEntreprise({
                variables: {
                  id: this.props.user.id,
                  email: this.props.user.profile.email
                },
                refetchQueries: [
                  {
                    query: GET_ENTREPRISES,
                    variables: {
                      search: "",
                      skip: 0,
                      limit: 8
                    }
                  }
                ]
              })
              .then(rest => {
                if (rest.data.removeEntreprise) {
                  Alert.success("Ce candidat a été supprimé avec succès");
                  this.props.history.goBack();
                }
              })
        },
        {
          label: "Non",
          onClick: () => { }
        }
      ]
    });
  };
  _handleChangeUpdate = () => {
    this.props.handleChangeUpdate();
  };
  _handleStatusUpdate = (id, status) => {
    this.props
      .updateUserStatus({
        variables: {
          status,
          id
        }
      })
      .then(res => {
        if (res) Alert.success("Etat changé avec succès");
        else Alert.warning("Erreur");
        this.props.refetch();
      });
  };

  _handleRemoveUser = (num, id) => {
    confirmAlert({
      title: "Demande de suppression d'un collaborateur",
      message:
        "Êtes-vous sûr de vouloir supprimer ce compte utilisateur ainsi que l'ensemble de ses informations (cette action est irréversible).",
      buttons: [

        {
          label: "Non",
          onClick: () => { }
        },
        {
          label: "Oui",
          onClick: () =>
            this.props
              .removeUserFromEntreprise({
                variables: {
                  num,
                  id
                }
              })
              .then(res => {
                if (res) Alert.success("Collaborateur supprimé avec succès");
                else Alert.warning("Erreur");
                this.props.refetch();
              })
        }
      ]
    });
  };
  render() {
    const {
      loading,
      user: {
        name,
        ent_type,
        profile: { id, email, is_blocked, is_blocked_by_admin },
        tel,
        application_email,
        name_of_in_charge,
        address_2,
        banner,
        website,
        description,
        activity,
        users,
        youtubeLink,
        linkedinLink,
        effective,
        address,
        userrs
      }
    } = this.props;
    const usersM = userrs.filter(function (item) {
      return item.prenom != null;
    });
    return (
      <CardBody>
        <div className="Profil-banner">
          <img className="img-banner_2" src={banner} alt={"logo"} />
        </div>
        <div className="Profil-logo">
          <img
            className="Profil-logo__img"
            src={this.state.src}
            onError={() => { this.setState({ src: logo }) }}
            alt={"logo"}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-4em",
            marginBottom: "1em"
          }}>
          <Button
            onClick={this._handleRemove}
            className="Profil-btn__edit"
            size="lg"
            text="Supprimer"
            loading={loading}
          />
          {is_blocked_by_admin ? (
            <Button
              onClick={() => this._handleStatusUpdate(id, false)}
              className="Profil-btn__edit"
              size="lg"
              text="Débloquer"
              loading={loading}
            />
          ) : (
              <Button
                onClick={() => this._handleStatusUpdate(id, true)}
                className="Profil-btn__edit"
                size="lg"
                text="Bloquer"
                loading={loading}
              />
            )}
        </div>
        {is_blocked && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "-2em",
              marginBottom: "1em"
            }}>
            <span
              style={{
                padding: "10px 110px",
                backgroundColor: "#f6c028",
                borderRadius: 24,
                color: "#646776"
              }}>
              Ce compte est bloquée par l'entreprise
            </span>
          </div>
        )}

        <ListGroup tag="div" className="Profil-group">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <ItemDetails label={ent_type == "entreprises" ? "Nom de l'entreprise" : "Nom de l'ecole"} value={name} />
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
              <a target="blank" href={website}>
                <ItemDetails label="Site web" value={website} />
              </a>
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
          {linkedinLink &&
            <Row>
              <Col xs={12} md={12} lg={12} xl={12} style={{ marginBottom: 6 }}>
                <a target="blank" href={linkedinLink}>
                  <ItemDetails label="Lien de linkedin" value={linkedinLink} />
                </a>
              </Col>
            </Row>}
          <Row style={{ marginBottom: 6 }}>
            <Col xs={12} md={12} lg={12} xl={12}>
              <ItemDetails
                label="Présentation de l'entreprise"
                value={description && Parser(description)}
              />
            </Col>
          </Row>
          {youtubeLink &&
            <Row>
              <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                <ItemDetails label="Lien de vidéo youtube" value={youtubeLink} />
              </Col>
              <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6, display: "grid", justifyContent: "center" }}>
                <ReactPlayer
                  url={youtubeLink}
                  width={"25rem"}
                  height={"20rem"}
                />
              </Col>
            </Row>}
          <Row style={{ marginBottom: 6 }}>
            <Col xs={12} md={12} lg={12} xl={12}>
              <div className="Profil-group__item list-group-item">
                <div
                  className="Profil-group__label"
                  style={{ marginBottom: 10 }}>
                  Liste des utilisateurs rattachés
                </div>
                {users && (
                  <Row
                    style={{
                      borderBottom: "1px solid #e3e3e3",
                      marginBottom: 10
                    }}>
                    <Col>Email</Col>
                    <Col>Nom Prenom</Col>
                    <Col>Type</Col>
                  </Row>
                )}
                {usersM &&
                  usersM.map(user => (
                    <Row key={user.id}>
                      <Col>{user.email}</Col>
                      <Col>{user.name} {user.prenom}</Col>
                      <Col>{user.is_holder ? "Principal" : "Collaborateur"}</Col>
                    </Row>
                  ))}
              </div>
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

const REMOVE_ENTREPRISE = gql`
  mutation removeEntreprise($id: String!, $email: String!) {
    removeEntreprise(id: $id, email: $email)
  }
`;
const REMOVE_USER_FROM_ENTREPRISE = gql`
  mutation removeUserFromEntreprise($num: Int!, $id: String!) {
    removeUserFromEntreprise(num: $num, id: $id)
  }
`;
export default withRouter(
  compose(
    graphql(REMOVE_ENTREPRISE, {
      name: "removeEntreprise"
    }),
    graphql(UPDATE_USER_STATUS, {
      name: "updateUserStatus"
    }),
    graphql(REMOVE_USER_FROM_ENTREPRISE, {
      name: "removeUserFromEntreprise"
    })
  )(EntrepriseInfo)
);
