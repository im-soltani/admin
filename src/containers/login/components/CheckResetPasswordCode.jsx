import React from "react";
import { Input, Label } from "reactstrap";
import Button from "../../../shared/components/Button";
import { BASE_URL } from "../../../handler/utils/constants";
import axios from "axios";
import PropTypes from "prop-types";
import Alert from "../../../handler/utils/Alert";

export default class CheckResetPasswordCode extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    setToken: PropTypes.func
  };
  constructor() {
    super();
    this.state = { loading: false };
  }

  setEmailRef = ref => {
    this.code = ref;
  };

  handleSubmit = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const code = this.code.value.trim();
      const data = {
        email: this.props.user.email,
        reset_password_code: code
      };
      axios
        .post(BASE_URL + "/auth/password/reset/code/check", data)
        .then(response => {
          this.setState({ loading: false });
          if (response.data.success) {
            this.props.setToken(response.data.reset_password_token);
          } else {
            Alert.warning(
              "Votre code peut être expiré, Veuillez envoyer un nouveau code"
            );
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error);
        });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <div className="Login-send">
        <Label
          className="form__form-group-label"
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          Veuillez saisir le code de réinitialisation que vous avez reçu par
          email.
        </Label>
        <br />
        <br />
        <br />

        <span className="form__form-group-label">Code</span>
        <Input
          name="code"
          type="code"
          className="Login-input"
          innerRef={this.setEmailRef}
        />
        <div><Button
          className="btn btn-primary account__btn account__btn--small"
          size="sm"
          style={{ marginTop: 30 }}
          onClick={this.handleSubmit}
          text="ENVOYER"
          color="primary"
          loading={loading}
        /></div>
        
      </div>
    );
  }
}
