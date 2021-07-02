import React from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import Layout from "../layout/index";
import { IS_LOGGED_IN } from "../../handler/queries.local";
import Alert from "../../handler/utils/Alert";
import Footer from "../layout/footer/Footer";
import { checkToken } from "../../handler/api/auth";

class PrivateRoute extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };
  componentDidMount() {
    if (localStorage.getItem("token-admin")) {
      checkToken(localStorage.getItem("token-admin"))
        .then(rest => {
          if (rest && rest.status && rest.status === 200) {
          } else {
            Alert.warning("Jeton d'authentification expiré");
            localStorage.removeItem("token-admin");
            this.props.history.replace("/connexion");
          }
        })
        .catch(() => {
          Alert.warning("Jeton d'authentification expiré");
          localStorage.removeItem("token-admin");
          this.props.history.replace("/connexion");
        });
    } else {
      localStorage.removeItem("token-admin");
      this.props.history.replace("/connexion");
    }
  }
  render() {
    const { children, isLoggedIn } = this.props;
    return isLoggedIn === false ? (
      <Redirect to="/connexion" />
    ) : (
      <div id="app">
        <Layout />
        <div className="container__wrap">{children}</div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  graphql(IS_LOGGED_IN, {
    props: ({ data: { isLoggedIn } }) => ({
      isLoggedIn: isLoggedIn ? isLoggedIn.isLoggedIn : false
    })
  })(PrivateRoute)
);
