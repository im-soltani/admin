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
import Checkbox from "../../../shared/components/Checkbox";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Alert from "../../../handler/utils/Alert";

class ShareCandidat extends React.Component {
  static propTypes = {
    toggle: PropTypes.func,
    mutate: PropTypes.func,
    modal: PropTypes.bool,
    rating: PropTypes.number,
    id: PropTypes.string.isRequired,
    recieved: PropTypes.bool
  };
  static defaultProps = {
    modal: false,
    recieved: false
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      recieved: props.recieved,
      rating: props.rating,
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
  getRating = rating => {
    this.setState({ rating });
  };

  handleChecked = (checked, name) => {
    this.setState({
      [name]: checked
    });
  };

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
      const sharedcv = true;
      const recieved = this.state.recieved;

      this.setState({ loading: true });
      this.props
        .mutate({
          variables: {
            id: this.props.id,
            sharedcv,
            recieved,
            rating: 1
          }
        })
        .then(() => {
          this.onResponse(() => {
            Alert.success("Le candidat a été partagé avec succès.");
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
            êtes vous sur de vouloir partager ce cv?
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col style={{ justifyContent: "center", marginTop: "3em" }}>
                {/* <FormGroup
                  className="ModalSahreCV-group__form"
                  style={{ textAlign: "center", marginTop: "3em" }}
                >
                  <span className="ModalSahreCV-rating__label">
                    Cliquez pour noter :
                  </span>
                  <Rating rating={rating} getRating={this.getRating} />
                </FormGroup> */}
                <FormGroup check className="ModalSahreCV-group__form">
                  <Checkbox
                    checked={this.state.recieved}
                    onCkeck={this.handleChecked}
                    name={"recieved"}
                    label={"Reçu en entretien"}
                  />
                </FormGroup>
                <div
                  style={{
                    width: "30em",
                    border: "1px solid #e0e0e0",
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
                    {loading ? "En cours" : "Partager"}
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

const SHARE_CANDIDAT_BY_ENTREPRISE = gql`
  mutation shareCandidatByEntreprise(
    $rating: Int!
    $sharedcv: Boolean!
    $recieved: Boolean!
    $id: ID!
  ) {
    shareCandidatByEntreprise(
      rating: $rating
      id: $id
      sharedcv: $sharedcv
      recieved: $recieved
    ) {
      first_name
      last_name
    }
  }
`;

export default graphql(SHARE_CANDIDAT_BY_ENTREPRISE)(ShareCandidat);
