import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Input,
  Row,
  FormGroup,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../../../handler/utils/Alert";
import { BASE_URL } from "../../../handler/utils/constants";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SendEmail extends React.Component {
  static propTypes = {
    toggle: PropTypes.func,
    modal: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.object,
    getEntrepriseProfile: PropTypes.object
  };

  static defaultProps = {
    error: null,
    getEntrepriseProfile: null
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      message: null,
      subject: null,
      loading: false
    };

    this._toggle = this._toggle.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.modal !== this.props.modal)
      this.setState({ modal: nextProps.modal });
  }

  _toggle() {
    this.props.toggle();
  }

  onResponse = cb => {
    this.setState(
      {
        loading: false
      },
      () => {
        cb();
      }
    );
  };

  onChangeSubject = e => this.setState({ subject: e.target.value });
  onChangeMessage = e => this.setState({ message: e.target.value });

  handleSubmit = () => {
    if (!this.state.loading) {
      if (this.state.subject && this.state.message) {
        this.setState({ loading: true });
        const token = localStorage.getItem("token-admin");
        axios.defaults.headers.authorization = token;
        axios
          .post(BASE_URL + "/mailer", {
            subject: this.state.subject,
            body: this.state.message,
            id: this.props.id
          })
          .then(() => {
            Alert.success("Votre email a été envoyé avec succès.");
            this.setState({ loading: null, message: null, subject: null });
            this._toggle();
          });
      } else {
        Alert.success("Veuillez remplir tous les champs");
      }
    }
  };

  render() {
    const { modal, loading } = this.state;
    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={this._toggle}
          className="ModalSahreCV"
          style={{ marginTop: "4%", width: "80%" }}
        >
          <ModalHeader
            toggle={this._toggle}
            style={{ textTransform: "uppercase" }}
          >
            Contacter le candidat
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col style={{ justifyContent: "center", marginTop: "1em" }}>
                <FormGroup className="ModalCV-group__form">
                  <Label className="ModalCV-group__label" for="last_name">
                    Sujet
                  </Label>
                  <Input
                    className="ModalCV-group__input"
                    placeholder="Sujet..."
                    type="text"
                    style={{ minHeight: 50 }}
                    value={this.state.subject}
                    onChange={this.onChangeSubject}
                  />
                </FormGroup>
                <FormGroup className="ModalCV-group__form">
                  <Label className="ModalCV-group__label" for="first_name">
                    Message
                  </Label>
                  <Input
                    className="ModalCV-group__input"
                    placeholder="Message..."
                    type="textarea"
                    style={{ minHeight: 100 }}
                    value={this.state.message}
                    onChange={this.onChangeMessage}
                  />
                </FormGroup>
                <FormGroup
                  className="ModalCV-group__form"
                  style={{
                    textAlign: "center",
                    marginTop: "3em",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Button
                    className="ModalCV-add__btn"
                    onClick={loading ? null : this.handleSubmit}
                  >
                    {loading ? "En cours" : "Envoyer"}
                  </Button>
                  <Button
                    className="ModalCV-cancel__btn"
                    style={{ height: "unset" }}
                    onClick={loading ? null : this._toggle}
                  >
                    {loading ? "En cours" : "Annuler"}
                  </Button>
                </FormGroup>
                <span
                  style={{
                    color: "gray",
                    fontSize: "1em",
                    padding: "12px 14px",
                    display: "contents",
                    textAlign: "justify"
                  }}
                >
                  NB: L'adresse utilisée pour l'envoi et la réception des emails
                  est celle que vous avez renseigné dans votre compte pour la
                  gestion des candidatures (
                  {this.props.getEntrepriseProfile &&
                    this.props.getEntrepriseProfile.application_email}
                  )
                </span>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const GET_ENTRPRISE = gql`
  query getEntrepriseProfile {
    getEntrepriseProfile {
      application_email
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
})(SendEmail);
