import React from "react";
import LogInForm from "./components/LogInForm";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import Alert from "../../handler/utils/Alert";
import CheckResetPasswordCode from "./components/CheckResetPasswordCode";
import SendResetPasswordCode from "./components/SendResetPasswordCode";
import ResetPassword from "./components/ResetPassword";
import { SET_TOKEN } from "../../handler/mutations.local";
import { checkToken } from "../../handler/api/auth";

const logo = `${process.env.PUBLIC_URL}/img/images/logo-SB.png`;

const Screens = {
  LOGIN: "LOGIN",
  SEND_CODE: "SEND_CODE",
  CHECK_CODE: "CHECK_CODE",
  RESET_PASSWORD: "RESET_PASSWORD"
};

class LogIn extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    setToken: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { screen: Screens.LOGIN, user: null, token: null };
  }
  onSuccess = token => {
    console.log(token);
    this.props
      .setToken({
        variables: { token }
      })
      .then(() => {
        this.props.history.replace("/");
      });
  };
  setForgotPasword = () => this.setState({ screen: Screens.SEND_CODE });
  setLogin = () =>
    this.setState({ screen: Screens.LOGIN, user: null, token: null });
  setUser = user => this.setState({ user, screen: Screens.CHECK_CODE });
  setToken = token => this.setState({ token, screen: Screens.RESET_PASSWORD });
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.token
    )
      checkToken(this.props.match.params.token)
        .then(rest => {
          if (rest && rest.status && rest.status === 200) {
            this.props
              .setToken({
                variables: { token: this.props.match.params.token }
              })
              .then(() => {
                this.props.history.replace("/");
              });
          } else {
            Alert.warning("Jeton d'authentification expiré");
          }
        })
        .catch(() => {
          Alert.warning("Jeton d'authentification expiré");
          this.setState({ loading: false }, () => {});
        });
  }
  renderScreen = () => {
    switch (this.state.screen) {
      case Screens.LOGIN:
        return (
          <LogInForm
            onSuccess={this.onSuccess}
            setForgotPasword={this.setForgotPasword}
          />
        );
      case Screens.SEND_CODE:
        return <SendResetPasswordCode setUser={this.setUser} />;
      case Screens.CHECK_CODE:
        return (
          <CheckResetPasswordCode
            setToken={this.setToken}
            user={this.state.user}
          />
        );
      case Screens.RESET_PASSWORD:
        return (
          <ResetPassword
            user={this.state.user}
            token={this.state.token}
            setLogin={this.setLogin}
          />
        );
    }
  };
  render() {
    return (
      <div className="account" id="app">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <div className="account__head-logo">
                <img src={logo} alt={"logo"} />
              </div>
            </div>
            {this.renderScreen()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  graphql(SET_TOKEN, {
    name: "setToken"
  })(LogIn)
);
