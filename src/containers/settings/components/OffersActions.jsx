import React, { Component } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import { GET_OFFERS_BY_STATUS } from "../../../handler/queries";
import Alert from "../../../handler/utils/Alert";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class OffersActions extends Component {
  static propTypes = {
    mutate: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.state = {
      collapse: false,
      collapse2: false,
      collapse3: false,
      collapse4: false
    };
  }

  onUpdate = state => {
    this.props
      .mutate({
        variables: {
          state: state
        },
        refetchQueries: [
          {
            query: GET_OFFERS_BY_STATUS,
            variables: {
              state: "DRAFT",
              search: "",
              skip: 0,
              limit: 4,
              field: "name",
                  direction: 1
            }
          }
        ]
      })
      .then(() => {
        Alert.success("Etat changé avec succès");
      });
  };

  toggle2() {
    this.setState(state => ({ collapse2: !state.collapse2 }));
  }
  toggle3() {
    this.setState(state => ({ collapse3: !state.collapse3 }));
  }
  toggle4() {
    this.setState(state => ({ collapse4: !state.collapse4 }));
  }

  render() {
    return (
      <Container className="Email-container">
        <div style={{ borderBottom: "1px solid #dcdcdc", marginBottom: "1em" }}>
          <Button
            className="MyCV-button__filter"
            onClick={this.toggle2}
            style={{ marginBottom: "1rem" }}
          >
            TOUT SUSPENDRE
            {this.state.collapse2 ? (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-down" />
              </span>
            ) : (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-right" />
              </span>
            )}
          </Button>
          <Collapse isOpen={this.state.collapse2}>
            <Row>
              <Col xs={12} md={12} lg={12} xl={9}>
                <Card>
                  <CardBody className="Email-card__p">
                    Cliquez sur le bouton « Tout Suspendre » si vous souhaitez
                    suspendre l’ensemble de vos offres actuellement validées ou
                    publiées.
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={12} xl={3}>
                <Button
                  onClick={() => this.onUpdate("ON_HOLD")}
                  className="Email-button__action"
                >
                  TOUT SUSPENDRE
                </Button>
              </Col>
            </Row>
          </Collapse>
        </div>
        <div style={{ borderBottom: "1px solid #dcdcdc", marginBottom: "1em" }}>
          <Button
            className="MyCV-button__filter"
            onClick={this.toggle3}
            style={{ marginBottom: "1rem" }}
          >
            TOUT ARCHIVER
            {this.state.collapse3 ? (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-down" />
              </span>
            ) : (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-right" />
              </span>
            )}
          </Button>
          <Collapse isOpen={this.state.collapse3}>
            <Row>
              <Col xs={12} md={12} lg={12} xl={9}>
                <Card>
                  <CardBody className="Email-card__p">
                    Cliquez sur le bouton « Tout Archiver » si vous souhaitez
                    archiver l’ensemble de vos offres qui ne sont pas encore
                    archivées.
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={12} xl={3}>
                <Button
                  onClick={() => this.onUpdate("ARCHIVED")}
                  className="Email-button__action"
                >
                  TOUT ARCHIVER
                </Button>
              </Col>
            </Row>
          </Collapse>
        </div>
        <div style={{ borderBottom: "1px solid #dcdcdc", marginBottom: "1em" }}>
          <Button
            className="MyCV-button__filter"
            onClick={this.toggle4}
            style={{ marginBottom: "1rem" }}
          >
            TOUT SUPPRIMER
            {this.state.collapse4 ? (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-down" />
              </span>
            ) : (
              <span className="MyCV-chevron">
                <i className="fa fa-chevron-right" />
              </span>
            )}
          </Button>
          <Collapse isOpen={this.state.collapse4}>
            <Row>
              <Col xs={12} md={12} lg={12} xl={9}>
                <Card>
                  <CardBody className="Email-card__p">
                    Cliquez sur le bouton « Tout Supprimer » si vous souhaitez
                    supprimer l’ensemble de vos offres.
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={12} xl={3}>
                <Button
                  onClick={() => this.onUpdate("DELETED")}
                  className="Email-button__action"
                >
                  TOUT SUPPRIMER
                </Button>
              </Col>
            </Row>
          </Collapse>
        </div>
      </Container>
    );
  }
}
const UPDATE_OFFERS_STATE = gql`
  mutation updateOffersState($state: String!) {
    updateOffersState(state: $state)
  }
`;
export default graphql(UPDATE_OFFERS_STATE)(OffersActions);
