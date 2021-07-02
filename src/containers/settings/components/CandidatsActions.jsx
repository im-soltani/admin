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
import Alert from "../../../handler/utils/Alert";
import { graphql } from "react-apollo";
import { UPDATE_USERS_STATUS, GET_USERS_STATS } from "../../../handler/queries";

class CandidatsActions extends Component {
  static propTypes = {
    mutate: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    this.state = {
      collapse: false,
      collapse2: false,
      collapse3: false
    };
  }

  onUpdate = status => {
    this.props
      .mutate({
        variables: {
          type: "candidats",
          status
        },
        refetchQueries: [
          {
            query: GET_USERS_STATS
          }
        ]
      })
      .then(res => {
        if (res) Alert.success("Etats changés avec succès");
        else Alert.success("Erreur");
      });
  };

  toggle2() {
    this.setState(state => ({ collapse2: !state.collapse2 }));
  }
  toggle3() {
    this.setState(state => ({ collapse3: !state.collapse3 }));
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
                    suspendre l’ensemble des candidats actuellement actives.
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={12} xl={3}>
                <Button
                  onClick={() => this.onUpdate(true)}
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
            TOUT ACTIVER
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
                    Cliquez sur le bouton « Tout Activer » si vous souhaitez
                    activer l’ensemble des candidats qui ne sont pas actives.
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={12} xl={3}>
                <Button
                  onClick={() => this.onUpdate(false)}
                  className="Email-button__action"
                >
                  TOUT ACTIVER
                </Button>
              </Col>
            </Row>
          </Collapse>
        </div>
      </Container>
    );
  }
}

export default graphql(UPDATE_USERS_STATUS)(CandidatsActions);
