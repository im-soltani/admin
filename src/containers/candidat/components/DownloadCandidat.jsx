import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  FormGroup
} from "reactstrap";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Alert from "../../../handler/utils/Alert";

class DownloadCandidat extends React.Component {
  static propTypes = {
    toggle: PropTypes.func,
    mutate: PropTypes.func,
    modal: PropTypes.bool,
    id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
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

  handleSubmit = () => {
    if (!this.state.loading) {
      const mycv = true;

      this.setState({ loading: true });
      this.props
        .mutate({
          variables: {
            id: this.props.id,
            mycv
          }
        })
        .then(() => {
          this.onResponse(() => {
            Alert.success("Le candidat a été ajouté à vos cv avec succès.");
            this._toggle();
          });
        })
        .catch(e => {
          this.onResponse(() => {
            if (e && e.graphQLErrors) console.log(e);
          });
        });
    }
  };

  render() {
    const { modal, loading } = this.state;
    return (
      <div>
        <Modal isOpen={modal} toggle={this._toggle} className="ModalSahreCV">
          <ModalHeader
            toggle={this._toggle}
            style={{ textTransform: "uppercase" }}
          >
            voulez-vous ajouter ce cv à vos cv?
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col style={{ justifyContent: "center", marginTop: "1em" }}>
                <div
                  style={{
                    width: "30em",
                    margin: "auto"
                  }}
                />
                <FormGroup
                  className="ModalSahreCV-group__form"
                  style={{
                    textAlign: "center",
                    marginTop: "3em",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Button
                    className="ModalSahreCV-add__btn"
                    onClick={loading ? null : this.handleSubmit}
                  >
                    {loading ? "En cours" : "Ajouter"}
                  </Button>
                  <Button
                    className="ModalSahreCV-cancel__btn"
                    onClick={loading ? null : this._toggle}
                  >
                    {loading ? "En cours" : "Annuler"}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DOWNLOAD_CANDIDAT_BY_ENTREPRISE = gql`
  mutation downloadCandidatByEntreprise($mycv: Boolean!, $id: ID!) {
    downloadCandidatByEntreprise(id: $id, mycv: $mycv) {
      first_name
      last_name
    }
  }
`;

export default graphql(DOWNLOAD_CANDIDAT_BY_ENTREPRISE)(DownloadCandidat);
