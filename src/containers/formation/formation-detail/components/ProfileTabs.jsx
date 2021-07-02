import React, { PureComponent } from "react";
import {
  Card,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { GET_OFFERS_BY_STATUS } from "../../../../handler/queries";
import ProfilLetter from "./ProfilLetter";
import Alert from "../../../../handler/utils/Alert";

class ProfileTabs extends PureComponent {
  static propTypes = {
    offer: PropTypes.object.isRequired,
    updateOfferState: PropTypes.func,
    refetch: PropTypes.func
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  holdOffer = state =>
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
              state: state === "ACTIF" ? "ON_HOLD_BY_ADMIN" : "ACTIF",
              search: "",
              skip: 0,
              limit: 5,
              field: "name",
                  direction: 1
            }
          }
        ]
      })
      .then(res => {
        if (res) Alert.success("Statut changé avec succès");
        else Alert.success("Erreur");
        this.props.refetch();
      });

  render() {
    const { offer } = this.props;
    return (
      <Col md={12} lg={7} xl={8}>
        <Card>
          <div className="profile__card tabs tabs--bordered-bottom">
            <img src={offer.banner} className="profile_banner" />

            {(offer.state === "PUBLISHED" || offer.state === "ACTIF") && (
              <Button
                className="profile-btn__hold"
                onClick={() => this.holdOffer("ON_HOLD_BY_ADMIN")}
              >
                Suspendre
              </Button>
            )}

            {(offer.state === "ON_HOLD" ||
              offer.state === "ON_HOLD_BY_ADMIN") && (
              <Button
                className="profile-btn__hold"
                onClick={() => this.holdOffer("ACTIF")}
              >
                Activer
              </Button>
            )}
            <Link
              className="profile-btn__cnd"
              to={`/modifier-formation/${offer.num}`}
            >
              Candidatures
            </Link>
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Description
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <ProfilLetter description={offer.description_poste} />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Card>
      </Col>
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
export default graphql(UPDATE_OFFER_STATE, {
  name: "updateOfferState"
})(ProfileTabs);
