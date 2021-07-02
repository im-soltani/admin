import gql from "graphql-tag";
import EyeIcon from "mdi-react/AddIcon";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import ReactPlayer from "react-player";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ListGroup,
  Row,
} from "reactstrap";
import { checkEmail } from "../../../handler/api/auth";
import { invalidEmail } from "../../../handler/errorMessages.json";
import { GET_ENTREPRISES } from "../../../handler/queries";
import Alert from "../../../handler/utils/Alert";
import {
  EMAIL_REGEX,
  REGEX_MOBILE,
  REGEX_WEBSITE,
} from "../../../handler/utils/constants";
import ActivityLabels from "../../../shared/components/ActivityLabels";
import AddressAutocomplete from "../../../shared/components/AddressAutocomplete";
import Button from "../../../shared/components/Button";
import EditorHtml from "../../../shared/components/Editor";
const logo = `${process.env.PUBLIC_URL}/img/images/placeholder.jpg`;

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
  address: null,
  youtubeLink: null,
};

class SchoolAdd extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    addEcole: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: "Profil",
    user: null,
    title: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile_pic_url: null,
      activity: [],
      youtubeLink: "",
      linkedinLink: "",
      errors: {
        ...defaultErrors,
      },
    };
  }
  location = { latitude: 0, longitude: 0 };
  name = null;
  email = null;
  tel = null;
  application_email = null;
  banner = null;
  website = null;
  description = null;
  zip_code = null;
  activity = null;
  country = null;
  city = null;
  zip_code_2 = null;
  country_2 = null;
  city_2 = null;
  effective = null;
  address = null;
  address_2 = null;
  profilePicture = React.createRef();
  profileBanner = React.createRef();

  setRef = (ref) => {
    if (ref) this[ref.name] = ref;
  };

  setDescriptionRef = (ref) => {
    if (ref) this.description = ref;
  };
  onLinkchange = (e) => {
    this.setState({ youtubeLink: e.target.value });
  };
  onLink2change = (e) => {
    this.setState({ linkedinLink: e.target.value });
  };
  updatePhoto = (e) => {
    if (e.target.files) {
      if (e.target.name === "profile_pic_url") {
        const file = e.target.files[0];
        this.setState({ profile_pic_url: e.target.files[0] }, () => {
          this.profilePicture.current.src = `${URL.createObjectURL(file)}`;
        });
      }
    }
  };

  onResponse = (cb) => {
    this.setState(
      {
        loading: false,
      },
      () => {
        cb();
      }
    );
  };

  delete = (index) => {
    let hamza = this.state.activity;
    hamza.splice(index, 1);
    this.setState({ activity: hamza });
  };

  setAddress = (object) => {
    if (object) {
      this.address = object.address;
      this.zip_code = object.zip_code;
      this.city = object.city;
      this.country = object.country;
      this.location = object.location;
    }
  };

  setAddress_2 = (object) => {
    if (object) {
      this.address_2 = object.address;
      this.zip_code_2 = object.zip_code;
      this.city_2 = object.city;
      this.country_2 = object.country;
    }
  };

  setActivity = (e) => {
    if (e.key === "Enter") {
      let hamza = this.state.activity;
      let index = hamza.indexOf(
        this.activity.value
          .trim()
          .charAt(0)
          .toUpperCase() + this.activity.value.trim().slice(1)
      );
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
    let index = hamza.indexOf(
      this.activity.value
        .trim()
        .charAt(0)
        .toUpperCase() + this.activity.value.trim().slice(1)
    );
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
  };
  _handleSubmit = async () => {
    if (!this.state.loading) {
      const name = this.name.value.trim();
      const name_of_in_charge = this.name_of_in_charge.value.trim();
      const address = this.address;
      const address_2 = this.address_2;
      const email = this.email.value.trim();
      const tel = this.tel.value.trim();
      const application_email = this.application_email.value.trim();

      const website = this.website.value.trim();
      const description = this.description;
      const { activity, youtubeLink, linkedinLink } = this.state;
      const zip_code = this.zip_code;
      const country = this.country;
      const city = this.city;
      const zip_code_2 = this.zip_code_2;

      const country_2 = this.country_2;

      const city_2 = this.city_2;
      const effective = this.effective.value;
      const errors = {
        ...defaultErrors,
      };
      if (name != null && name.length < 2)
        errors.name =
          "Le nom est obligatoire et doit comporter au moins 3 caractères";
      if (name_of_in_charge != null && name_of_in_charge.length < 2)
        errors.name_of_in_charge =
          "Le nom du responsable est obligatoire et doit comporter au moins 3 caractères";
      if (address != null && address.length < 2)
        errors.address =
          "L'adresse est obligatoire et doit comporter au moins 3 caractères";
      if (!EMAIL_REGEX.test(application_email))
        errors.application_email = invalidEmail;
      if (!REGEX_MOBILE.test(tel))
        errors.tel =
          "Le numéro de téléphone est obligatoire et doit comporter au moins 9 chiffre";
      if (!EMAIL_REGEX.test(email)) errors.email = invalidEmail;
      else {
        await checkEmail({ email })
          .then(({ success, message }) => {
            if (!success) {
              errors.email = message;
            }
          })
          .catch(() => {});
      }

      if (!REGEX_WEBSITE.test(website))
        errors.website = "Le site web est obligatoire et doit être valide";

      if (activity != null && activity.length <= 0)
        errors.activity =
          "Les activités sont obligatoires et doit comporter au moins une activité";
      if (description != null && description.length < 100)
        errors.description =
          "La description est obligatoire et doit comporter au moins 100 caractères";
      if (isNaN(effective) || effective < 1)
        errors.effective =
          "L'effectif est obligatoire et doit être un nombre positif";
      if (!this.state.profile_pic_url)
        errors.profile_pic_url = "Le logo est obligatoire";
      if (youtubeLink.length > 0 && !ReactPlayer.canPlay(youtubeLink))
        errors.youtubeLink =
          "Le lien de vidéo youtube n'est obligatoire mais doit être valide";
      if (
        errors.name ||
        errors.name_of_in_charge ||
        errors.email ||
        errors.tel ||
        errors.application_email ||
        errors.website ||
        errors.activity ||
        errors.description ||
        errors.effective ||
        errors.profile_pic_url ||
        errors.youtubeLink
      ) {
        this.setState({ errors: { ...errors } });
        Alert.warning(
          "Merci de corriger les problèmes identifiés dans le formulaire"
        );
      } else {
        this.setState({ loading: true, errors });

        this.props
          .addEcole({
            variables: {
              file: this.state.profile_pic_url,
              input: {
                application_email,
                name_of_in_charge,
                email,
                activity,
                effective,
                description,
                name,
                tel,
                location: this.location,
                website,
                address_2,
                zip_code_2,
                country_2,
                city_2,
                address,
                country,
                city,
                zip_code,
                ent_type: "ecole",
                youtubeLink,
                linkedinLink,
              },
            },
            refetchQueries: [
              {
                query: GET_ENTREPRISES,
                variables: {
                  search: "",
                  skip: 0,
                  limit: 8,
                  ent_type: "ecole",
                },
              },
            ],
          })
          .then(() => {
            this.onResponse(() => {
              Alert.success("L'entreprise a été ajoutée avec succès");
              this.props.history.replace("/écoles");
            });
          })
          .catch((e) => {
            this.onResponse(() => {
              console.log(e);
            });
          });
      }
    }
  };

  render() {
    const { errors, activity, loading, youtubeLink, linkedinLink } = this.state;
    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <ListGroup tag="div" className="Profil-group">
              <Row className="justify-content-center">
                <Col xs={12} md={6} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="img-logo"
                      ref={this.profilePicture}
                      src={
                        this.state.profile_pic_url
                          ? this.state.profile_pic_url
                          : logo
                      }
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
                    className="btn Profil-logo__btn__upload font-size-medium medium-padding text-white">
                    <i className="fa fa-camera" style={{ marginRight: 6 }} />
                    MODIFIER
                  </Label>
                  <span style={{ color: "red" }}>{errors.profile_pic_url}</span>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Nom de l'école
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
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
                      addressEntreprise={{}}
                      setAddress={this.setAddress}
                    />
                    <span style={{ color: "red" }}>{errors.address}</span>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Autre établissement
                    </Label>
                    <AddressAutocomplete
                      addressEntreprise={{}}
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
                        onKeyPress={this.setActivity}
                        type="text"
                        name="activity"
                        placeholder="Activité"
                        invalid={!!errors.activity}
                      />
                      <button
                        className="form__form-group-button-entreprise"
                        onClick={this.setActivityRef}>
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
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Lien de linkedin
                    </Label>
                    <Input
                      className="Profil-group__input"
                      defaultValue={linkedinLink}
                      type="text"
                      name="linkedinLink"
                      placeholder="Lien de vidéo youtube"
                      onChange={this.onLink2change}
                      invalid={!!errors.linkedinLink}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label
                      className="Profil-group__label forceMarBottom"
                      for="name">
                      Présentation de l'école
                    </Label>
                    <EditorHtml
                      description={this.description}
                      setDescriptionRef={this.setDescriptionRef}
                    />
                    <span style={{ color: "red" }}>{errors.description}</span>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12} lg={6} xl={6} style={{ marginBottom: 6 }}>
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Lien de vidéo youtube
                    </Label>
                    <Input
                      className="Profil-group__input"
                      defaultValue={youtubeLink}
                      type="text"
                      name="youtubeLink"
                      placeholder="Lien de vidéo youtube"
                      onChange={this.onLink2change}
                      invalid={!!errors.youtubeLink}
                    />
                    <FormFeedback>{errors.youtubeLink}</FormFeedback>
                  </FormGroup>
                </Col>
                {youtubeLink && ReactPlayer.canPlay(youtubeLink) ? (
                  <Col
                    xs={12}
                    md={12}
                    lg={6}
                    xl={6}
                    style={{
                      marginBottom: 6,
                      display: "grid",
                      justifyContent: "center",
                    }}>
                    <ReactPlayer
                      url={youtubeLink}
                      width={"25rem"}
                      height={"20rem"}
                    />
                  </Col>
                ) : (
                  <Col
                    xs={12}
                    md={12}
                    lg={6}
                    xl={6}
                    style={{ marginBottom: 6 }}
                  />
                )}
              </Row>
            </ListGroup>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
const ADD_ECOLE = gql`
  mutation addEcole($file: Upload!, $input: EntrepriseInput!) {
    addEcole(file: $file, input: $input) {
      id
    }
  }
`;
export default withRouter(
  graphql(ADD_ECOLE, {
    name: "addEcole",
  })(SchoolAdd)
);
