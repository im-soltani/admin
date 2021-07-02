import React from "react";
import PropTypes from "prop-types";
import { Container, Label, Button, Row, Col } from "reactstrap";
import { graphql, compose } from "react-apollo";

import gql from "graphql-tag";
import StickyLabels from "../../../shared/components/StickyLabels";
import Icon from "../../../shared/components/Icon";
import * as moment from "moment";
import { GET_OFFERS_BY_STATUS } from "../../../handler/queries";
import { withRouter, Link } from "react-router-dom";
import Alert from "../../../handler/utils/Alert";
class OfferItem extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    offer: PropTypes.object,
    state: PropTypes.string,
    search: PropTypes.string,
    skip: PropTypes.number,
    limit: PropTypes.number,
    updateOfferState: PropTypes.func,
    duplicateOffer: PropTypes.func,
    onUpdateted: PropTypes.func
  };

  static defaultProps = {
    offer: {},
    status: "DRAFT",
    sort: "recent",
    skip: 0,
    limit: 4,
    search: ""
  };

  onUpdate = state => {
    this.props
      .updateOfferState({
        variables: {
          id: this.props.offer.id,
          state: state
        },
        refetchQueries: [
          {
            query: GET_OFFERS_BY_STATUS,
            variables: {
              state: this.props.state,
              search: this.props.search,
              skip: this.props.skip,
              limit: this.props.limit,
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

  _handleDuplicate = () => {
    this.props
      .duplicateOffer({
        variables: {
          id: this.props.offer.id
        },
        refetchQueries: [
          {
            query: GET_OFFERS_BY_STATUS,
            variables: {
              state: "DRAFT",
              search: "",
              skip: 0,
              limit: 4
            }
          }
        ]
      })
      .then(res => {
        Alert.success("Offre dupliquée avec succès");
        this.props.history.push({
          pathname: `/offre/${res.data.duplicateOffer.id}`,
          state: { tab: "2" }
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { offer } = this.props;
    return (
      <Container key={offer.num} className="OfferItem">
        <Row>
          <Col xs={12} md={5} lg={5} xl={5}>
            <Label className="OfferItem-name">
              <Link to={`/modifier-offre/${offer.num}`}>{offer.name}</Link>
              {offer.state !== "DRAFT" && (
                <span className="OfferItem-badge">
                  {offer.application_number}
                </span>
              )}
            </Label>
            <br />
            <Label
              className="OfferItem-label"
              style={{
                fontWeight: 600,
                color: "#828181",
                textTransform: "uppercase"
              }}
            >
              {offer.city}
            </Label>
            <br />
            <Label className="OfferItem-label">
              Créée le {moment(offer.createdAt).format("DD/MM/YYYY")}
            </Label>
          </Col>

          <Col xs={12} md={4} lg={4} xl={4}>
            <StickyLabels
              items={offer.competences}
              className="OfferItem-sticky"
            />
          </Col>
          <Col xs={12} md={1} lg={1} xl={1}>
            {offer.state === "DRAFT" && (
              <Button
                className="OfferItem-btn__draft"
                onClick={() => this.onUpdate("ACTIF")}
              >
                Activer
              </Button>
            )}
            {offer.state === "ACTIF" && (
              <Button
                className="OfferItem-btn__actif"
                onClick={() => this.onUpdate("PUBLISHED")}
              >
                Publier
              </Button>
            )}
            {offer.state === "PUBLISHED" && (
              <Button className="OfferItem-btn__rien">Rien</Button>
            )}
            {offer.state === "ON_HOLD" && (
              <Button
                className="OfferItem-btn__draft"
                onClick={() => this.onUpdate("ACTIF")}
              >
                Réactiver
              </Button>
            )}
          </Col>
          <Col xs={12} md={2} lg={2} xl={2}>
            <Row
              className="Row-up-see"
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginBottom: "1em"
              }}
            >
              <div style={{ cursor: "pointer" }} title="Détail">
                <Link to={`/offre/${offer.num}`}>
                  <Icon className="OfferItem__see-offer" name="see-offer" />
                </Link>
              </div>
            </Row>
            <Row
              style={{
                display: "flex",
                flexDirection: "row-reverse"
              }}
              className="Row-up"
            >
              <div
                title="Supprimer"
                onClick={() => this.onUpdate("DELETED")}
                style={{ cursor: "pointer" }}
              >
                <Icon className="OfferItem__remove-offer" name="remove-offer" />
              </div>
              {(offer.state === "ACTIF" ||
                offer.state === "PUBLISHED" ||
                offer.state === "ON_HOLD" ||
                offer.state === "ON_HOLD_BY_ADMIN") && (
                <div
                  title="Archiver"
                  onClick={() => this.onUpdate("ARCHIVED")}
                  style={{ cursor: "pointer" }}
                >
                  <Icon
                    className="OfferItem__archive-offer"
                    name="archive-offer"
                  />
                </div>
              )}
              {(offer.state === "ACTIF" || offer.state === "PUBLISHED") && (
                <div
                  title="Suspendre"
                  onClick={() => this.onUpdate("ON_HOLD")}
                  style={{ cursor: "pointer" }}
                >
                  <Icon className="OfferItem__hold-offer" name="hold-offer" />
                </div>
              )}
              {offer.state !== "ARCHIVED" && (
                <div style={{ cursor: "pointer" }} title="Modifier">
                  <Link
                    to={{
                      pathname: `/modifer-offer/${offer.num}`,
                      state: {
                        tab: "2"
                      }
                    }}
                  >
                    <Icon className="OfferItem__edit-offer" name="edit-offer" />
                  </Link>
                </div>
              )}
              <div
                style={{ cursor: "pointer" }}
                onClick={this._handleDuplicate}
                title="Dupliquer"
              >
                <Icon className="OfferItem__dup-offer" name="offer-dup" />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
const UPDATE_OFFER_STATE = gql`
  mutation updateOfferState($id: ID!, $state: String!) {
    updateOfferState(id: $id, state: $state) {
      name
    }
  }
`;
const DUPLICATE_OFFER = gql`
  mutation duplicateOffer($id: ID!) {
    duplicateOffer(id: $id) {
      name
      id
    }
  }
`;
export default withRouter(
  compose(
    graphql(UPDATE_OFFER_STATE, {
      name: "updateOfferState"
    }),
    graphql(DUPLICATE_OFFER, {
      name: "duplicateOffer"
    })
  )(OfferItem)
);
