import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  ListGroup,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  FormFeedback
} from "reactstrap";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import EyeIcon from "mdi-react/AddIcon";
import ActivityLabels from "../../../shared/components/ActivityLabels";
import Button from "../../../shared/components/Button";
import EditorHtml from "../../../shared/components/Editor";
import Alert from "../../../handler/utils/Alert";
import AddressAutocomplete from "../../../shared/components/AddressAutocomplete";
import { invalidEmail } from "../../../handler/errorMessages.json";
import { EMAIL_REGEX } from "../../../handler/utils/constants";
import { checkEmail } from "../../../handler/api/auth";

const defaultErrors = {
  name: null,
  email: null,
  profile_pic_url: null,
  tel: null,
  application_email: null,
  banner: null,
  website: null,
  description: null,
  activity: null,
  zip_code: null,
  country: null,
  city: null,
  effective: null,
  address: null
};

class EntrepriseInfoUpdate extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    handleChangeUpdate: PropTypes.func,
    updateEntrepriseLogo: PropTypes.func,
    updateEntrepriseBanner: PropTypes.func,
    updateEntreprise: PropTypes.func,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    className: "Profil",
    user: null,
    title: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activity: props.user.activity,
      errors: {
        ...defaultErrors
      }
    };
  }

  name = null;
  email = null;
  profile_pic_url = null;
  tel = null;
  application_email = null;
  banner = null;
  website = null;
  description = null;
  zip_code = null;
  country = null;
  activity = null;
  city = null;
  zip_code_2 = null;
  country_2 = null;
  city_2 = null;
  effective = null;
  address = null;
  address_2 = null;
  profilePicture = React.createRef();
  profileBanner = React.createRef();

  setRef = ref => {
    if (ref) this[ref.name] = ref;
  };

  setDescriptionRef = ref => {
    if (ref) this.description = ref;
  };

  updatePhoto = e => {
    if (e.target.files) {
      if (e.target.name === "profile_pic_url") {
        const file = e.target.files[0];
        this.props
          .updateEntrepriseLogo({
            variables: {
              file,
              id: this.props.user.id
            }
          })
          .then(() => {
            setTimeout(() => {
              this.onResponse(() => {
                this.profilePicture.current.src = `${URL.createObjectURL(
                  file
                )}`;
              });
            }, 4000);
          })
          .catch(e => {
            this.onResponse(() => {
              if (e && e.graphQLErrors) console.log(e);
            });
          });
      } else if (e.target.name === "banner") {
        const file = e.target.files[0];
        this.props
          .updateEntrepriseBanner({
            variables: {
              file,
              id: this.props.user.id
            }
          })
          .then(() => {
            setTimeout(() => {
              this.onResponse(() => {
                this.profileBanner.current.src = `${URL.createObjectURL(file)}`;
              }, 4000);
            });
          })
          .catch(e => {
            this.onResponse(() => {
              if (e && e.graphQLErrors) console.log(e);
            });
          });
      }
    }
  };

  _handleChangeUpdate = () => {
    this.props.handleChangeUpdate();
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

  delete = index => {
    let hamza = this.state.activity;
    hamza.splice(index, 1);
    this.setState({ activity: hamza });
  };

  setAddress = object => {
    if (object) {
      this.address = object.address;
      this.zip_code = object.zip_code;
      this.city = object.city;
      this.country = object.country;
    }
  };

  setAddress_2 = object => {
    if (object) {
      this.address_2 = object.address;
      this.zip_code_2 = object.zip_code;
      this.city_2 = object.city;
      this.country_2 = object.country;
    }
  };
  setActivity = e => {
    if (e.key === "Enter") {
      let hamza = this.state.activity;
      let index = hamza.indexOf(this.activity.value);
      if (index === -1) {
        hamza.push(
          this.activity.value
            .trim()
            .charAt(0)
            .toUpperCase() + this.activity.value.trim().slice(1)
        );
        this.setState({ activity: hamza });
        this.activity.value = "";
      } else Alert.warning("Cette activité existe déjà");
    }
  };
  setActivityRef = () => {
    let hamza = this.state.activity;
    let index = hamza.indexOf(this.activity.value);

    if (hamza && hamza.length > 0 && index === -1) {
      hamza.push(
        this.activity.value
          .trim()
          .charAt(0)
          .toUpperCase() + this.activity.value.trim().slice(1)
      );
      this.setState({ activity: hamza });
      this.activity.value = "";
    } else if (hamza && hamza.length === 0 && index === -1) {
      hamza.push(
        this.activity.value
          .trim()
          .charAt(0)
          .toUpperCase() + this.activity.value.trim().slice(1)
      );
      this.setState({ activity: hamza });
      this.activity.value = "";
    } else Alert.warning("Cette activité existe déjà");
  };
  _handleSubmit = async () => {
    if (!this.state.loading) {
      const name = this.name.value.trim();
      const name_of_in_charge = this.name_of_in_charge.value.trim();
      const address = this.address ? this.address : this.props.user.address;
      const address_2 = this.address_2
        ? this.address_2
        : this.props.user.address_2;
      const email = this.email.value.trim();
      const tel = this.tel.value.trim();
      const application_email = this.application_email.value.trim();

      const website = this.website.value.trim();
      const description = this.description
        ? this.description
        : this.props.user.description;
      const activity = this.state.activity;
      const zip_code = this.zip_code ? this.zip_code : this.props.user.zip_code;
      const country = this.country ? this.country : this.props.user.country;
      const city = this.city ? this.city : this.props.user.city;
      const zip_code_2 = this.zip_code_2
        ? this.zip_code_2
        : this.props.user.zip_code_2;
      const country_2 = this.country_2
        ? this.country_2
        : this.props.user.country_2;
      const city_2 = this.city_2 ? this.city_2 : this.props.user.city_2;
      const effective = this.effective.value.trim();
      const errors = {
        ...defaultErrors
      };
      if (name.length < 2) errors.name = "Trop court";
      if (name_of_in_charge.length < 2) errors.name_of_in_charge = "Trop court";
      if (address.length < 2) errors.address = "Trop court";
      if (!EMAIL_REGEX.test(application_email))
        errors.application_email = invalidEmail;
      if (tel.length < 2) errors.tel = "Trop court";
      if (!EMAIL_REGEX.test(email)) errors.email = invalidEmail;
      else if (email !== this.props.user.profile.email)
        await checkEmail({ email })
          .then(({ success, message }) => {
            if (!success) {
              errors.email = message;
            }
          })
          .catch(() => {});

      if (website.length < 2) errors.website = "Trop court";
      if (activity.length <= 0) errors.activity = "Trop court";
      if (description.length < 2) errors.description = "Trop court";
      if (isNaN(effective)) errors.effective = "c'est pas un entier";
      if (
        errors.name ||
        errors.name_of_in_charge ||
        errors.email ||
        errors.tel ||
        errors.application_email ||
        errors.website ||
        errors.activity ||
        errors.description ||
        errors.effective
      )
        this.setState({ errors: { ...errors } });
      else {
        this.setState({ loading: true, errors });
        if (this.props.user)
          this.props
            .updateEntreprise({
              variables: {
                id: this.props.user.id,
                input: {
                  application_email,
                  name_of_in_charge,
                  activity,
                  email,
                  effective,
                  description,
                  name,
                  tel,
                  website,
                  address_2,
                  zip_code_2,
                  country_2,
                  city_2,
                  address,
                  country,
                  city,
                  zip_code
                }
              }
            })
            .then(() => {
              this.onResponse(() => {
                Alert.success("Le profil a été mis à jour avec succès");
                this.props.handleChangeUpdate();
              });
            })
            .catch(e => {
              this.onResponse(() => {
                if (e && e.graphQLErrors)
                  Alert.error(e.graphQLErrors[0].message);
              });
            });
      }
    }
  };

  render() {
    const { errors, activity } = this.state;
    const {
      loading,
      user: {
        name,
        profile_pic_url,
        profile: { email },
        tel,
        application_email,
        name_of_in_charge,
        banner,
        website,
        description,
        zip_code,
        country,
        city,
        effective,
        address,
        address_2,
        zip_code_2,
        country_2,
        city_2
      }
    } = this.props;
    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <ListGroup tag="div" className="Profil-group">
              <Row className="justify-content-center">
                <Col xs={12} md={6} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <div>
                    <img
                      className="img-logo"
                      ref={this.profilePicture}
                      src={profile_pic_url}
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
                    invalid={!!this.profile_pic_url}
                    innerRef={this.setRef}
                  />
                  <Label
                    htmlFor="profile_pic_url"
                    className="btn Profil-logo__btn__upload font-size-medium medium-padding text-white"
                  >
                    <i className="fa fa-camera" style={{ marginRight: 6 }} />
                    MODIFIER
                  </Label>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <img
                    ref={this.profileBanner}
                    src={banner}
                    alt={"logo"}
                    className="img-banner"
                  />
                  <Input
                    onChange={this.updatePhoto}
                    style={{ visibility: "hidden" }}
                    id="banner"
                    name="banner"
                    type="file"
                    accept="image/jpeg, image/png"
                    invalid={!!this.banner}
                    innerRef={this.setRef}
                  />
                  <Label
                    htmlFor="banner"
                    className="btn Profil-logo__btn__upload font-size-medium medium-padding text-white"
                  >
                    <i className="fa fa-camera" style={{ marginRight: 6 }} />
                    MODIFIER
                  </Label>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Nom de la société
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={name}
                      type="text"
                      name="name"
                      placeholder="Nom"
                      invalid={!!errors.name}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Nom, prénom du responsable
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={name_of_in_charge}
                      type="text"
                      name="name_of_in_charge"
                      placeholder="Nom, prénom du responsable"
                      invalid={!!errors.name_of_in_charge}
                    />
                    <FormFeedback>{errors.name_of_in_charge}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Adresse principale
                    </Label>
                    <AddressAutocomplete
                      addressEntreprise={{
                        address: address,
                        zip_code: zip_code,
                        country: country,
                        city: city
                      }}
                      setAddress={this.setAddress}
                    />
                    <FormFeedback>{errors.address}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Autre établissement
                    </Label>
                    <AddressAutocomplete
                      addressEntreprise={{
                        address: address_2,
                        zip_code: zip_code_2,
                        country: country_2,
                        city: city_2
                      }}
                      setAddress={this.setAddress_2}
                    />
                    <FormFeedback>{errors.address_2}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Email principal
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={email}
                      type="email"
                      name="email"
                      placeholder="Adresse email principale"
                      invalid={!!errors.email}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Email de candidature
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={application_email}
                      type="text"
                      name="application_email"
                      placeholder="Email de candidature"
                      invalid={!!errors.application_email}
                    />
                    <FormFeedback>{errors.application_email}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Numéro de téléphone
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={tel}
                      type="text"
                      name="tel"
                      placeholder="Numéro de téléphone"
                      invalid={!!errors.tel}
                    />
                    <FormFeedback>{errors.tel}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Site web
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={website}
                      type="text"
                      name="website"
                      placeholder="Site web"
                      invalid={!!errors.website}
                    />
                    <FormFeedback>{errors.website}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Activité
                    </Label>
                    <div className="form__form-group-field">
                      <Input
                        innerRef={this.setRef}
                        //onKeyPress={this.setActivity}
                        type="text"
                        name="activity"
                        placeholder="Activité"
                        invalid={!!errors.activity}
                      />
                      <button
                        className="form__form-group-button-entreprise"
                        onClick={this.setActivityRef}
                      >
                        <EyeIcon />
                      </button>
                    </div>
                    <FormFeedback>{errors.activity}</FormFeedback>
                  </FormGroup>
                  <ActivityLabels
                    items={activity}
                    delete={this.delete}
                    className="Profil-sticky"
                  />
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Effectif
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={effective}
                      type="number"
                      name="effective"
                      placeholder="Effectif"
                      invalid={!!errors.effective}
                    />
                    <FormFeedback>{errors.effective}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginBottom: 6 }}
                >
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Présentation de l'entreprise
                    </Label>
                    <EditorHtml
                      description={description}
                      setDescriptionRef={this.setDescriptionRef}
                    />
                    <FormFeedback>{errors.description}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
            </ListGroup>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={this._handleChangeUpdate}
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
                text="SAUVEGARDER"
                color="primary"
                loading={loading}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
const UPDATE_ENTREPRISE = gql`
  mutation updateEntreprise($id: ID!, $input: UpdateEntrepriseInput!) {
    updateEntreprise(id: $id, input: $input) {
      id
      application_email

      activity
      effective
      description
      name
      tel
      website
      address
      country
      city
      zip_code
    }
  }
`;

const UPDATE_ENTREPRISE_LOGO = gql`
  mutation updateEntrepriseLogo($file: Upload!, $id: ID) {
    updateEntrepriseLogo(file: $file, id: $id)
  }
`;

const UPDATE_ENTREPRISE_BANNER = gql`
  mutation updateEntrepriseBanner($file: Upload!, $id: ID) {
    updateEntrepriseBanner(file: $file, id: $id)
  }
`;
export default compose(
  graphql(UPDATE_ENTREPRISE, {
    name: "updateEntreprise"
  }),
  graphql(UPDATE_ENTREPRISE_LOGO, {
    name: "updateEntrepriseLogo"
  }),
  graphql(UPDATE_ENTREPRISE_BANNER, {
    name: "updateEntrepriseBanner"
  })
)(EntrepriseInfoUpdate);
