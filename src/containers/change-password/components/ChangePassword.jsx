import React from "react";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Button from "../../../shared/components/Button";
import Alert from "../../../handler/utils/Alert";

class ChangePassword extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    mutate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      password: "",
      confirmPassword: "",
      oldPasswordError: null,
      passwordError: null,
      confirmPasswordError: null,
      loading: false
    };
  }

  validate = () => {
    let error = false;
    let errors = {};
    this.setState({
      oldPasswordError: null,
      passwordError: null,
      confirmPasswordError: null,
      error: {}
    });
    if (!this.state.oldPasswordError && this.state.oldPassword.length < 5) {
      errors = { oldPasswordError: "Le mot de pass est trop court" };
    }
    if (this.state.password.length < 5) {
      error = true;
      errors = { ...errors, passwordError: "Le mot de passe est trop court" };
    } else if (this.state.password != this.state.confirmPassword) {
      error = true;
      errors = {
        ...errors,
        confirmPasswordError: "Les mots de passe ne sont pas identiques"
      };
    }
    if (this.state.oldPassword == this.state.password) {
      error = true;
      errors = {
        ...errors,
        confirmPasswordError: null,
        oldPasswordError: null,
        passwordError: "Veuillez choisir un autre mot de passe"
      };
    }
    this.setState({ ...errors });
    return !error;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleSubmit = () => {
    if (!this.state.loading && this.validate()) {
      this.setState({ loading: true });
      this.props
        .mutate({
          variables: {
            oldPassword: this.state.oldPassword,
            password: this.state.password
          }
        })
        .then(response => {
          if (response.data && response.data.changePassword) {
            Alert.success("Votre mot de passe a été mis à jour");
            setTimeout(() => {
              this.props.history.push("/");
            }, 2000);
          } else {
            Alert.warning("Mot de passe actuel est incorret");
          }
          this.setState({ loading: false });
        })
        .catch(error => {
          Alert.error("Échec lors de mis à jour de votre mot de passe");
          console.log(error);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const {
      oldPassword,
      password,
      confirmPassword,
      oldPasswordError,
      passwordError,
      confirmPasswordError,
      loading
    } = this.state;

    return (
      <Form style={{ width: "90%", marginLeft: "3%" }}>
        <FormGroup>
          <Label for="oldPassword" className="Profil-group__label">
            Ancien mot de passe
          </Label>
          <Input
            className="Profil-group__input"
            type="password"
            value={oldPassword}
            onChange={this.onChange}
            name="oldPassword"
            id="oldPassword"
            placeholder="*******"
            invalid={!!oldPasswordError}
          />
          <FormFeedback>{oldPasswordError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password" className="Profil-group__label">
            Nouveau mot de passe
          </Label>
          <Input
            className="Profil-group__input"
            type="password"
            value={password}
            name="password"
            onChange={this.onChange}
            id="password"
            placeholder="*******"
            invalid={!!passwordError}
          />
          <FormFeedback>{passwordError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword" className="Profil-group__label">
            Confirmer nouveau mot de passe
          </Label>
          <Input
            className="Profil-group__input"
            type="password"
            value={confirmPassword}
            onChange={this.onChange}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*******"
            invalid={!!confirmPasswordError}
          />
          <FormFeedback>{confirmPasswordError}</FormFeedback>
        </FormGroup>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => this.props.history.push("/")}
            className="Profil-btn__cancel"
            size="lg"
            text="Annuler"
            color="secondary"
            loading={loading}
          />

          <Button
            onClick={this._handleSubmit}
            className="Profil-btn__success"
            size="lg"
            text={"SAUVEGARDER"}
            color="primary"
            loading={loading}
          />
        </div>
      </Form>
    );
  }
}
const UPDATE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $password: String!) {
    changePassword(oldPassword: $oldPassword, password: $password)
  }
`;
export default withRouter(graphql(UPDATE_PASSWORD)(ChangePassword));
