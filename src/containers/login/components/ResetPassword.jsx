import React from "react";
import EyeIcon from "mdi-react/EyeIcon";
import { Input, Label } from "reactstrap";
import Button from "../../../shared/components/Button";
import { BASE_URL } from "../../../handler/utils/constants";
import axios from "axios";
import PropTypes from "prop-types";
import Alert from "../../../handler/utils/Alert";

export default class ResetPassword extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    setLogin: PropTypes.func
  };
  constructor() {
    super();
    this.state = {
      passwordError: null,
      ConfirmPasswordError: null,
      loading: false,
      showConfirmPassword: false,
      showPassword: false
    };
  }

  setConfirmPasswordRef = ref => {
    this.confirmPassword = ref;
  };

  setPasswordRef = ref => {
    this.password = ref;
  };

  validate = () => {
    const password = this.password.value.trim();
    const confirmPassword = this.confirmPassword.value.trim();
    this.setState({ passwordError: null, confirmPasswordError: null });
    if (password.length < 5) {
      this.setState({ passwordError: "Mot de passe est trop court" });
      return false;
    }
    if (password != confirmPassword) {
      this.setState({
        confirmPasswordError: "Les mots de passe doivent être indentiques"
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    const password = this.password.value.trim();
    if (!this.state.loading && this.validate()) {
      this.setState({ loading: true });
      const data = {
        email: this.props.user.email,
        reset_password_token: this.props.token,
        password: password
      };
      axios
        .post(BASE_URL + "/auth/password/reset/admin", data)
        .then(response => {
          this.setState({ loading: false });
          if (response.data.success) {
            Alert.success("Votre mot de passe est mis à jour avec succés");
            this.props.setLogin();
          } else {
            Alert.warning(
              "Votre code peut être expiré, Veuillez renvoyer un nouveau code"
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
        });
    }
  };

  showPassword = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  showConfirmPassword = e => {
    e.preventDefault();
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword
    });
  };
  render() {
    const { loading, showConfirmPassword, showPassword } = this.state;
    return (
      <div style={{ minWidth: 520 }}>
        <Label
          className="form__form-group-label"
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          Réinitialisation de mot de passe
        </Label>
        <br />
        <br />
        <br />
        <span className="form__form-group-label">Mot de passe</span>
        <div className="form__form-group-field">
          <Input
            id="password"
            name="password"
            innerRef={this.setPasswordRef}
            type={showPassword ? "text" : "password"}
            placeholder="******"
            style={{ width: "75%", height: "unset" }}
          />
          <button
            className={`form__form-group-button${
              this.state.showPassword ? " active" : ""
            }`}
            onClick={e => this.showPassword(e)}
          >
            <EyeIcon />
          </button>
        </div>
        {this.state.passwordError && (
          <span
            style={{
              fontSize: 14,
              width: "100%",
              marginTop: "0.25rem",
              color: "#e4c213"
            }}
          >
            {this.state.passwordError}
          </span>
        )}
        <br />
        <span className="form__form-group-label">
          Confirmation du mot de passe
        </span>
        <div className="form__form-group-field">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            innerRef={this.setConfirmPasswordRef}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="*****"
            style={{ width: "75%", height: "unset" }}
          />
          <button
            className={`form__form-group-button${
              this.state.showConfirmPassword ? " active" : ""
            }`}
            onClick={e => this.showConfirmPassword(e)}
          >
            <EyeIcon />
          </button>
        </div>

        {this.state.confirmPasswordError && (
          <span
            style={{
              fontSize: 14,
              width: "100%",
              marginTop: "0.25rem",
              color: "#e4c213"
            }}
          >
            {this.state.confirmPasswordError}
          </span>
        )}
        <br />
        <Button
          style={{ width: "81%" }}
          className="btn btn-primary account__btn account__btn--small"
          size="sm"
          onClick={this.handleSubmit}
          text="ENVOYER"
          color="primary"
          loading={loading}
        />
      </div>
    );
  }
}
