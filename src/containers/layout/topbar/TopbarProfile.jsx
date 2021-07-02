import React, { PureComponent } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import { SET_TOKEN } from "../../../handler/mutations.local";
import TopbarMenuLink from "./TopbarMenuLink";
import { GET_ADMIN } from "../../../handler/queries";

class TopbarProfile extends PureComponent {
  static propTypes = {
    setToken: PropTypes.func.isRequired,
    getAdmin: PropTypes.object.isRequired
  };

  static defaultProps = {
    getAdmin: {
      last_name: "Admin",
      first_name: "Admin",
      profile_pic_url: null
    }
  };

  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  logout = () => {
    this.props
      .setToken({
        variables: {
          token: null
        }
      })
      .then(() => {
        localStorage.removeItem("token-admin");
      });
  };
  render() {
    const { last_name, first_name, profile_pic_url } = this.props.getAdmin;

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          {profile_pic_url ? (
            <img
              src={profile_pic_url}
              alt="avatar"
              className="topbar__avatar-img"
            />
          ) : (
            <div
              className={"topbar-letters-div"}
              style={{ height: 50, width: 50 }}
            >
              <div className="topbar-letters">
                {`${`${first_name.charAt(0)}${last_name.charAt(
                  0
                )}`}`.toUpperCase()}
              </div>
            </div>
          )}
          <p className="topbar__avatar-name">{first_name + " " + last_name}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && (
          <button className="topbar__back" onClick={this.toggle} />
        )}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu" onClick={this.toggle}>
            <TopbarMenuLink title="Mon profil" icon="user" path="/admin" />
            <TopbarMenuLink
              title="Mon organisation"
              icon="store"
              path="/compte"
            />
            <TopbarMenuLink
              title="Mes candidats"
              icon="users"
              path="/mes-candidats"
            />
            <TopbarMenuLink title="Mes offres" icon="list" path="/mes-offres" />

            <TopbarMenuLink
              title="Changer le mot de passe"
              icon="keyboard"
              path="/changer-mot-de-passe"
            />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink
              title="Déconnexion"
              icon="exit"
              button={true}
              callback={this.logout}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}
export default compose(
  graphql(GET_ADMIN, {
    options: () => ({
      variables: {
        num: null
      },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, error, getAdmin } }) => ({
      loading,
      error,
      getAdmin
    })
  }),
  graphql(SET_TOKEN, {
    name: "setToken"
  })
)(TopbarProfile);
