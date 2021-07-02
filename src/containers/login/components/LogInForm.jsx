import React, { PureComponent } from "react";
import EyeIcon from "mdi-react/EyeIcon";
import { Input } from "reactstrap";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import Button from "../../../shared/components/Button";
import { auth, invalidEmail } from "../../../handler/errorMessages.json";
import { EMAIL_REGEX } from "../../../handler/utils/constants";
import { signin } from "../../../handler/api/auth";
import PropTypes from "prop-types";
import Alert from "../../../handler/utils/Alert";

class LogInForm extends PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    setForgotPasword: PropTypes.func.isRequired
  };

  state = {
    showPassword: false,
    loading: false,
    errors: {
      email: null,
      password: null
    }
  };

  email = null;
  password = null;

  setEmailRef = ref => {
    this.email = ref;
  };

  setPasswordRef = ref => {
    this.password = ref;
  };

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  handleSubmit = () => {
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    let errors = { email: null, password: null };
    if (!EMAIL_REGEX.test(email)) errors.email = invalidEmail;
    if (password.length < 5) errors.password = auth.invalidPassword;
    if (errors.email || errors.password)
      this.setState({
        errors
      });
    else {
      this.setState({ loading: true });
      signin({ email, password })
        .then(({ success, token, message }) => {
          if (!success) {
            this.setState({ loading: false }, () => {
              Alert.warning(message);
              this.password.value = "";
            });
          } else {
            console.log("ttt",token)
            localStorage.setItem("token-admin", token);
            this.props.onSuccess(token);
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({ loading: false }, () => {});
        });
    }
  };
  render() {
    const { showPassword, loading, errors } = this.state;
    return (
      <div className="form" style={{ flexDirection: "row-reverse" }}>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input
              name="email"
              type="text"
              style={{ fontSize: 16 }}
              placeholder="Email"
              invalid={!!errors.email}
              innerRef={this.setEmailRef}
            />
          </div>
          {errors.email && (
            <span
              style={{
                fontSize: 14,
                width: "100%",
                marginTop: "0.25rem",
                color: "#e4c213"
              }}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Mot de passe</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Input
              name="password"
              invalid={!!errors.password}
              innerRef={this.setPasswordRef}
              type={showPassword ? "text" : "password"}
              style={{ fontSize: 16 }}
              placeholder="Mot de passe"
            />
            <button
              className={`form__form-group-button${
                this.state.showPassword ? " active" : ""
              }`}
              onClick={this.showPassword}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && (
            <span
              style={{
                fontSize: 14,
                width: "100%",
                marginTop: "0.25rem",
                color: "#e4c213"
              }}
            >
              {errors.password}
            </span>
          )}
          <div
            className="account__forgot-password"
            style={{
              cursor: "pointer",
              marginTop: 20,
              color: "white",
              fontSize: "1rem"
            }}
          >
            <span onClick={this.props.setForgotPasword}>
              Mot de passe oublié?
            </span>
          </div>
        </div>
        <div style={{ marginBottom: -30, marginTop: 20 }}>
          <Button
            className="btn btn-primary account__btn "
            size="sm"
            onClick={this.handleSubmit}
            text="S'authentifier"
            color="primary"
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default LogInForm;
