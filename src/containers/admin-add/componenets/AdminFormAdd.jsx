import React from "react";
import PropTypes from "prop-types";
import {
  CardBody,
  ListGroup,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  FormFeedback
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import EyeIcon from "mdi-react/EyeIcon";
import { EMAIL_REGEX } from "../../../handler/utils/constants";
import Button from "../../../shared/components/Button";
import { GET_ADMINS } from "../../../handler/queries";
import { invalidEmail } from "../../../handler/errorMessages.json";
import { checkEmail } from "../../../handler/api/auth";

const defaultErrors = {
  last_name: null,
  first_name: null,
  email: null,
  password: null
};

class AdminFormAdd extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    mutate: PropTypes.func,
    match: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showPassword: false,
      errors: {
        ...defaultErrors
      }
    };
  }

  last_name = null;
  first_name = null;
  email = null;
  password = null;

  profilePicture = React.createRef();

  setRef = ref => {
    if (ref) this[ref.name] = ref;
  };

  updatePhoto = e => {
    if (e.target.files) {
      if (e.target.name === "profile_pic_url") {
        const file = e.target.files[0];
        this.setState({ profile_pic_url: e.target.files[0] }, () => {
          this.profilePicture.current.src = `${URL.createObjectURL(file)}`;
        });
      }
    }
  };

  onResponse = cb => {
    this.setState(
      {
        loading: false
      },
      () => {
        cb();
      }
    );
  };

  _handleAdd = async () => {
    if (!this.state.loading) {
      const last_name = this.last_name ? this.last_name.value.trim() : "";
      const first_name = this.first_name ? this.first_name.value.trim() : "";
      const email = this.email ? this.email.value.trim() : "";
      const password = this.password ? this.password.value : "";
      const file = this.state.profile_pic_url
        ? this.state.profile_pic_url
        : null;

      const errors = {
        ...defaultErrors
      };

      if (first_name.length < 1)
        errors.first_name =
          "Le prénom est obligatoire et doit comporter au moins un caractère";
      if (last_name.length < 1)
        errors.last_name =
          "Le nom est obligatoire et doit comporter au moins un caractère";
      if (!EMAIL_REGEX.test(email)) errors.email = invalidEmail;
      else
        await checkEmail({ email })
          .then(({ success, message }) => {
            if (!success) {
              errors.email = message;
            }
          })
          .catch(() => { });

      if (password.length < 3)
        errors.password =
          "Le mot de passe est obligatoire et doit comporter au moins 6 caractères";
      if (
        errors.first_name ||
        errors.last_name ||
        errors.email ||
        errors.password
      )
        this.setState({ errors: { ...errors } });
      else {
        this.setState({ loading: true, errors });

        this.props
          .mutate({
            variables: {
              file,
              input: {
                last_name,
                first_name,
                email,
                password
              }
            },
            refetchQueries: [
              {
                query: GET_ADMINS,
                variables: {
                  skip: 0,
                  limit: 8
                }
              }
            ]
          })
          .then(() => {
            this.props.history.push("/administrateurs");
          })
          .catch(e => {
            this.onResponse(() => {
              console.log(e);
            });
          });
      }
    }
  };
  showPassword = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  render() {
    const { showPassword, errors } = this.state;

    return (
      <CardBody>
        <ListGroup tag="div" className="Profil-group">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={6} xl={6} style={{ marginBottom: 6 }}>
              <div>
                <img
                  className="img-logo"
                  ref={this.profilePicture}
                  src={this.state.profile_pic_url}
                  alt={"logo"}
                  style={{ width: "50%" }}
                />
              </div>

              <Input
                style={{ visibility: "hidden" }}
                id="profile_pic_url"
                name="profile_pic_url"
                type="file"
                accept="image/jpeg, image/png"
                onChange={this.updatePhoto}
                invalid={!!this.state.profile_pic_url}
                innerRef={this.setRef}
              />
              <Label
                htmlFor="profile_pic_url"
                className="btn Profil-logo__btn__upload font-size-medium medium-padding text-white"
              >
                <i className="fa fa-camera" style={{ marginRight: 6 }} />
                CHOISIR UNE PHOTO DE PROFIL
              </Label>
            </Col>
          </Row>
          <Row style={{ marginBottom: 6 }}>
            <Col xs={12} md={12} lg={12} xl={12}>
              <FormGroup>
                <Label className="Profil-group__label" for="name">
                  Prénom <span style={{ marginLeft: 5, color: "red" }}>*</span>
                </Label>
                <Input
                  className="Profil-group__input"
                  innerRef={this.setRef}
                  type="text"
                  name="first_name"
                  placeholder="Prénom"
                  invalid={!!errors.first_name}
                />

                <FormFeedback>{errors.first_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={12} lg={12} xl={12}>
              <FormGroup>
                <Label className="Profil-group__label" for="name">
                  Nom <span style={{ marginLeft: 5, color: "red" }}>*</span>
                </Label>
                <Input
                  className="Profil-group__input"
                  innerRef={this.setRef}
                  type="text"
                  name="last_name"
                  placeholder="Nom"
                  invalid={!!errors.last_name}
                />

                <FormFeedback>{errors.last_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={12} lg={12} xl={12}>
              <FormGroup>
                <Label className="Profil-group__label" for="name">
                  Email <span style={{ marginLeft: 5, color: "red" }}>*</span>
                </Label>
                <Input
                  className="Profil-group__input"
                  innerRef={this.setRef}
                  type="text"
                  name="email"
                  placeholder="Email"
                  invalid={!!errors.email}
                />

                <FormFeedback>{errors.email}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={12} lg={12} xl={12}>
              <FormGroup>
                <Label className="Profil-group__label" for="name">
                  Mot de passe{" "}
                  <span style={{ marginLeft: 5, color: "red" }}>*</span>
                </Label>
                <div className="form__form-group-field">
                  <Input
                    name="password"
                    innerRef={this.setRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                  />
                  <button
                    className={`form__form-group-button${this.state.showPassword ? " active" : ""
                      }`}
                    onClick={e => this.showPassword(e)}
                  >
                    <EyeIcon />
                  </button>
                </div>
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </ListGroup>

        <div className="Profil-btns">
          <Button
            onClick={() => this.props.history.push("/administrateurs")}
            className="Profil-btn__cancel"
            size="lg"
            text="Annuler"
            color="secondary"
            loading={this.state.loading}
          />{" "}
          <Button
            onClick={this._handleAdd}
            className="Profil-btn__success"
            size="lg"
            text={"SAUVEGARDER"}
            color="primary"
            loading={this.state.loading}
          />
        </div>
      </CardBody>
    );
  }
}
const ADD_ADMIN = gql`
  mutation addAdmin($file: Upload, $input: AdminAddInput!) {
    addAdmin(file: $file, input: $input) {
      id
    }
  }
`;
export default withRouter(graphql(ADD_ADMIN)(AdminFormAdd));
