import React from "react";
import Alert from "../../../handler/utils/Alert";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import gql from "graphql-tag";
import * as moment from "moment";
import "moment/locale/fr";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { graphql, compose } from "react-apollo";
import { UPDATE_USER_STATUS } from "../../../handler/queries";

import ShareCandidat from "./ShareCandidat";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class ProfileMain extends React.Component {
  static propTypes = {
    profile_pic_url: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    id_profile: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
    //getCandidatByNum: PropTypes.object,
    removeCandidat: PropTypes.func,
    is_blocked: PropTypes.number.isRequired,
    is_blocked_by_admin: PropTypes.number.isRequired,
    mutate: PropTypes.func,
    refetch: PropTypes.func,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      loading: false
    };
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
              .removeCandidat({
                variables: {
                  id: this.props.id,
                  email: this.props.email
                }
              })
              .then(rest => {
                if (rest.data.removeCandidat) {
                  Alert.success("Ce candidat a été supprimé avec succès");
                  this.props.history.goBack();
                }
              })
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  _handleStatusUpdate = (id, status) => {
    this.setState({ loading: true });
    this.props
      .mutate({
        variables: {
          status,
          id
        }
      })
      .then(res => {
        if (res) Alert.success("Etat changé avec succès");
        else Alert.success("Erreur");
        this.props.refetch();
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      profile_pic_url,
      last_name,
      first_name,
      email,
      createdAt,
      is_blocked,
      is_blocked_by_admin,
      id,
      id_profile,
      //getCandidatByNum,
      num,
    } = this.props;
    const { modalShare, loading } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <ShareCandidat modal={modalShare} toggle={this.toggleShare} id={id} />
        <Card>
          <CardBody className="profile__card">
            <div className="profile__information">
              <div className="profile__avatar">
                {profile_pic_url ? (
                  <img src={profile_pic_url} alt="avatar" />
                ) : (
                  <div className={"Candidat-letters-div"}>
                    <div className="Candidat-letters">
                      {`${`${last_name.charAt(0)}${first_name.charAt(
                        0
                      )}`}`.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <div className="profile__data">
                <p className="profile__name">
                  {first_name + " " + last_name}
                  {is_blocked_by_admin ? (
                    <span className="blocked">Bloqué par DL</span>
                  ) : is_blocked ? (
                    <span className="blocked">Bloqué par candidat</span>
                  ) : (
                    <span />
                  )}
                </p>
                <p className="profile__contact"> {email}</p>
                <p className="profile__work">
                  Ajouté le {moment(createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            {is_blocked_by_admin ? (
              <Button
                onClick={() => this._handleStatusUpdate(id_profile, false)}
                className="Candidat-active"
                size="lg"
                text="Débloquer"
                loading={loading}
              />
            ) : (
              <Button
                onClick={() => this._handleStatusUpdate(id_profile, true)}
                className="Candidat-deactive"
                size="lg"
                text="Bloquer"
                loading={loading}
              />
            )}
            <Button
              onClick={this._handleRemove}
              className="Candidat-deactive"
              size="lg"
              text="Supprimer"
              loading={loading}
            />
               <Link
                  
                  to={`/modifier-candidat/${num}`}
                >
            <Button
             
              className="Candidat-deactive"
              size="lg"
              text="Modifier"
              loading={loading}
            />
            </Link>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const REMOVE_CANDIDAT = gql`
  mutation removeCandidat($id: String!, $email: String!) {
    removeCandidat(id: $id, email: $email)
  }
`;

export default withRouter(
  compose(
    graphql(REMOVE_CANDIDAT, {
      name: "removeCandidat"
    }),
    graphql(UPDATE_USER_STATUS)
   
  )(ProfileMain)
);

