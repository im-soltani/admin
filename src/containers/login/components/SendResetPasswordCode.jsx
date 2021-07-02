import React from "react";
import { Input, Label } from "reactstrap";
import Button from "../../../shared/components/Button";
import { invalidEmail } from "../../../handler/errorMessages.json";
import { EMAIL_REGEX, BASE_URL } from "../../../handler/utils/constants";
import axios from "axios";
import PropTypes from "prop-types";
import Alert from "../../../handler/utils/Alert";

export default class SendResetPasswordCode extends React.Component {
  static propTypes = {
    setUser: PropTypes.func
  };
  constructor() {
    super();
    this.state = {
      loading: false,
      errors: {
        email: null
      }
    };
  }

  setEmailRef = ref => {
    this.email = ref;
  };

  handleSubmit = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const email = this.email.value.trim();

      let errors = { email: null };
      if (!EMAIL_REGEX.test(email)) errors.email = invalidEmail;

      if (errors.email)
        this.setState({
          errors
        });
      else {
        axios
          .post(BASE_URL + "/auth/password/reset/code/admin/send", {
            email: email
          })
          .then(response => {
            this.setState({ loading: false });
            if (response.data.success) {
              this.props.setUser(response.data.user);
            } else {
              Alert.warning("email incorrect");
            }
          })
          .catch(reason => {
            console.log(reason);
            this.setState({ loading: false });
          });
      }
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
          Veuillez saisir l'adresse à laquelle vous souhaitez recevoir l'email
          de réinitialisation du mot de passe.
        </Label>
        <br />
        <br />
        <br />
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <Input
              name="email"
              type="email"
              className="Login-input"
              innerRef={this.setEmailRef}
            />
          </div>
        </div>
        <br />
        <div> <Button
          className="btn btn-primary account__btn account__btn--small"
          size="sm"
          onClick={this.handleSubmit}
          text="ENVOYER"
          color="primary"
          loading={loading}
        /></div>
       
      </div>
    );
  }
}
