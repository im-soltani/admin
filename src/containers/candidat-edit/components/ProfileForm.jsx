import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import { compose, graphql } from "react-apollo";
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
import { GET_COMPETENCES, GET_JOBS } from "../../../handler/queries";
import Alert from "../../../handler/utils/Alert";
import {
  contratConst,
  etudeConst,
  experienceConst,
} from "../../../handler/utils/constants";
import AddressAutocomplete from "../../../shared/components/AddressAutocomplete";
import Autosuggestion from "../../../shared/components/Autosuggestion";
import Button from "../../../shared/components/Button";
import DatePicker from "../../../shared/components/DatePicker";
import EditorHtml from "../../../shared/components/Editor";
import PdfPreview from "../../../shared/components/PdfPreview";
import Select from "../../../shared/components/Select";
import PreviewLetter from "./PreviewLetter";

const defaultErrors = {
  name: null,
  email: null,
  profile_pic_url: null,
  tel: null,
  cv: null,
  jobs: null,
  sharedcv: null,
  experience: null,
  country: null,
  jobs: null,
  city: null,
  suggestions: null,
  contract: null,
  etude: null,
  letter: null,
  disponibility: null,
  address: null,
  zip_code: null,
};

class ProfileForm extends React.Component {
  static propTypes = {
    getCandidatByNum: PropTypes.object,
    addCV: PropTypes.func,
    refetch: PropTypes.func,
    handleChangeUpdate: PropTypes.func,
    updateCandidat: PropTypes.func,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getCompetences: PropTypes.object,
    getJobs: PropTypes.object,
  };

  static defaultProps = {
    className: "Profil",
    getCandidatByNum: null,
    title: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      file: null,
      letter: props.getCandidatByNum.letter
        ? props.getCandidatByNum.letter
        : null,
      file_eng: null,
      job_id: props.getCandidatByNum.job_id
        ? props.getCandidatByNum.job_id
        : null,
      selectedDay:
        props.getCandidatByNum && props.getCandidatByNum.disponibility
          ? props.getCandidatByNum.disponibility
          : new Date(),
      suggestions: props.getCandidatByNum.competences,
      contract: props.getCandidatByNum.contract
        ? props.getCandidatByNum.contract
        : null,
      experience: props.getCandidatByNum.experience
        ? props.getCandidatByNum.experience
        : null,
      offer: {},
      etude: props.getCandidatByNum.etude ? props.getCandidatByNum.etude : null,
      work_time: props.getCandidatByNum.work_time
        ? props.getCandidatByNum.work_time
        : null,
      errors: {
        ...defaultErrors,
      },
    };
  }

  name = null;
  email = null;
  profile_pic_url = null;
  tel = null;
  cv = null;
  jobs = null;
  sharedcv = null;
  competences = null;
  experience = null;
  country = null;
  city = null;
  contract = null;
  etude = null;
  letter = null;
  disponibility = null;
  address = null;
  zip_code = null;

  // On component mount, scroll to ref
  componentDidMount() {
    window.scrollTo({
      top:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.top
          ? this.props.location.state.top
          : 0,
      behavior: "smooth",
    });
  }

  setRef = (ref) => {
    if (ref) this[ref.name] = ref;
  };
  onSelect = (value, name) => {
    this.setState({ [name]: value });
  };

  setDescriptionRef = (ref) => {
    if (ref) this.description = ref;
  };
  getDate = (selectedDay) => {
    this.setState({ selectedDay });
  };
  updateDoc = (e) => {
    if (e.target.files) {
      if (e.target.name === "cv") {
        const file = e.target.files[0];
        this.props
          .addCV({
            variables: {
              id: this.props.getCandidatByNum.id,
              file,
              type: "fr",
            },
          })
          .then(() => {
            setTimeout(() => {
              this.onResponse(() => {
                this.setState({
                  file: file,
                });
              }, 1000);
            });
          })
          .catch((e) => {
            this.onResponse(() => {
              if (e && e.graphQLErrors) console.log(e);
            });
          });
      } else if (e.target.name === "cv_eng") {
        const file = e.target.files[0];
        this.props
          .addCV({
            variables: {
              id: this.props.getCandidatByNum.id,
              file,
              type: "eng",
            },
          })
          .then(() => {
            setTimeout(() => {
              this.onResponse(() => {
                this.setState({
                  file_eng: file,
                });
              }, 1000);
            });
          })
          .catch((e) => {
            this.onResponse(() => {
              if (e && e.graphQLErrors) console.log(e);
            });
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
  pushSelectedSuggestion = (suggestion) => {
    if (this.state.suggestions.indexOf(suggestion) === -1) {
      let suggestions = [];
      suggestions.push(suggestion.name);
      this.setState({ suggestions: suggestions });
    }
  };

  setTemplateRef = (ref) => {
    if (ref && this.state.letter) this.setState({ letter: ref });
    else this.setState({ letter: "<body><div>" + ref + "</div></body>" });
  };
  delete = (index) => {
    let hamza = this.state.suggestions;
    hamza.splice(index, 1);
    this.setState({ suggestions: hamza });
  };

  setAddress = (object) => {
    if (object) {
      this.address = object.address;
      this.city = object.city;
      this.zip_code = object.zip_code;
      this.country = object.country;
    }
  };

  _handleSubmit = () => {
    if (!this.state.loading) {
      const first_name = this.first_name.value.trim();
      const last_name = this.last_name.value.trim();
      const tel = this.tel.value.trim();
      const address = this.address
        ? this.address
        : this.props.getCandidatByNum.address;
      const email = this.email
        ? this.email.value.trim()
        : this.props.getCandidatByNum.profile.email;
      const country = this.country
        ? this.country
        : this.props.getCandidatByNum.country;
      const city = this.city ? this.city : this.props.getCandidatByNum.city;
      const zip_code = this.zip_code
        ? this.zip_code
        : this.props.getCandidatByNum.zip_code;

      const competences = this.state.suggestions;
      const errors = {
        ...defaultErrors,
      };
      const job_id = this.state.job_id ? this.state.job_id.trim() : null;
      let jobs = [];
      if (job_id) {
        this.props.getJobs.jobs.filter(
          (job) => job.id.toString() === job_id.toString()
        ) &&
          this.props.getJobs.jobs.filter(
            (job) => job.id.toString() === job_id.toString()
          ).length > 0 &&
          jobs.push(
            this.props.getJobs.jobs.filter(
              (job) => job.id.toString() === job_id.toString()
            )[0].name
          );
      } else errors.jobs = "Ce champs est obligatoire";

      const disponibility = this.state.selectedDay;
      const { contract, experience, etude, letter } = this.state;
      if (first_name.length < 1)
        errors.first_name =
          "Le prénom est obligatoire et doit comporter au moins un caractère";
      if (last_name.length < 1)
        errors.last_name =
          "Le nom est obligatoire et doit comporter au moins un caractère";
      if (!address) errors.address = "Ce champs est obligatoire";
      else if (address.length < 3)
        errors.address =
          "L'adresse est obligatoire et doit comporter au moins 3 caractères";
      if (tel.length < 8)
        errors.tel =
          "Le numéro de téléphone est obligatoire et doit comporter au moins 8 caractères";
      if (competences.length === 0)
        errors.suggestions =
          "Les compétences sont obligatoires et doit comporter au moins une compétence";
      if (!job_id) errors.jobs = "Le métier est obligatoire";
      if (!contract) errors.contract = "Le contrat est obligatoire";
      if (!experience) errors.experience = "L'expérience est obligatoire";
      if (!etude) errors.etude = "Le niveau d'étude est obligatoire";

      if (
        errors.first_name ||
        errors.last_name ||
        errors.tel ||
        errors.etude ||
        errors.address ||
        errors.jobs ||
        errors.contract ||
        errors.experience ||
        errors.suggestions
      ) {
        this.setState({ errors: { ...errors } });
        Alert.warning(
          "Merci de corriger les problèmes identifiés dans le formulaire"
        );
      } else {
        this.setState({ loading: true, errors });
        if (this.props.getCandidatByNum)
          this.props
            .updateCandidat({
              variables: {
                id: this.props.getCandidatByNum.id,
                input: {
                  last_name,
                  first_name,
                  tel,
                  address,
                  country,
                  city,
                  zip_code,
                  email,
                  letter,
                  jobs,
                  disponibility: new Date(disponibility).getTime(),
                  contract,
                  experience,
                  etude,
                  competences,
                },
              },
            })
            .then(() => {
              this.onResponse(() => {
                Alert.success(
                  `Le profil du candidat n°${this.props.getCandidatByNum.num} a été mis à jour avec succès`
                );
                this.props.refetch();
                this.props.history.goBack();
              });
            })
            .catch((e) => {
              this.onResponse(() => {
                if (e && e.graphQLErrors)
                  Alert.error(e.graphQLErrors[0].message);
              });
            });
      }
    }
  };

  render() {
    const {
      errors,
      loading,
      suggestions,
      job_id,
      file,
      file_eng,
      selectedDay,
    } = this.state;
    const {
      getCandidatByNum: {
        profile: { email },
        last_name,
        first_name,
        etude,
        tel,
        country,
        city,
        contract,
        experience,
        address,
        zip_code,
        cv,
        cv_eng,
        num,
      },
      getJobs,
      getCompetences,
    } = this.props;

    return (
      <Col md={12} className="Profil">
        <Card>
          <CardBody>
            <ListGroup tag="div" className="Profil-group">
              <span className="Profil-header">
                {last_name + " " + first_name + " - "}candidat num°{num}
              </span>
              <span className="Profil-subheader">Informations Générales</span>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Nom <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={first_name}
                      type="text"
                      name="first_name"
                      placeholder="Nom"
                      invalid={!!errors.first_name}
                    />
                    <FormFeedback>{errors.first_name}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-right">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Prénom{" "}
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={last_name}
                      type="text"
                      name="last_name"
                      placeholder="Prénom"
                      invalid={!!errors.last_name}
                    />
                    <FormFeedback>{errors.last_name}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Adresse email{" "}
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Input
                      className="Profil-group__input"
                      innerRef={this.setRef}
                      defaultValue={email}
                      type="email"
                      name="email"
                      placeholder="Adresse email"
                      invalid={!!errors.email}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-right">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Numéro de téléphone{" "}
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
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
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Adresse{" "}
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <AddressAutocomplete
                      addressEntreprise={{
                        address: address,
                        country: country,
                        zip_code: zip_code,
                        city: city,
                      }}
                      setAddress={this.setAddress}
                    />
                    {errors.address && (
                      <span className="span-error">{errors.address}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <span className="Profil-subheader">
                Informations personnelles
              </span>
              <Row style={{ marginBottom: 6 }}>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Votre métier
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Select
                      className="Profil-group__input"
                      onSelect={this.onSelect}
                      name={"job_id"}
                      defaultValue={job_id}
                      items={getJobs && getJobs.jobs ? getJobs.jobs : []}
                      error={errors.jobs}
                    />

                    <FormFeedback>{errors.jobs}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-right">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Contrat souhaité
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Select
                      className="Profil-group__input"
                      onSelect={this.onSelect}
                      name={"contract"}
                      defaultValue={contract}
                      items={contratConst}
                      error={errors.contract}
                    />

                    <FormFeedback>{errors.contract}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 6 }}>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Vos compétences (20 max)
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Autosuggestion
                      items={
                        getCompetences && getCompetences.competences
                          ? getCompetences.competences
                          : []
                      }
                      pushSelectedSuggestion={this.pushSelectedSuggestion}
                    />
                    <FormFeedback>{errors.suggestions}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-right">
                  <FormGroup>
                    <Label
                      className="Profil-group__label"
                      style={{ color: "white" }}
                      for="name">
                      SONT
                    </Label>

                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {suggestions.map((item, index) => {
                        return (
                          <label key={index} className="Candidat-sticky">
                            {item}
                          </label>
                        );
                      })}
                    </div>

                    {errors.suggestions && (
                      <span className="span-error">{errors.suggestions}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <span className="Profil-subheader">Questions pratiques</span>
              <Row style={{ marginBottom: 6 }}>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Votre niveau d'études
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Select
                      className="Profil-group__input"
                      onSelect={this.onSelect}
                      name={"etude"}
                      defaultValue={etude}
                      items={etudeConst}
                      error={errors.etude}
                    />

                    <FormFeedback>{errors.etude}</FormFeedback>
                  </FormGroup>
                </Col>

                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-right">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Votre expérience
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <Select
                      className="Profil-group__input"
                      onSelect={this.onSelect}
                      name={"experience"}
                      defaultValue={experience}
                      items={experienceConst}
                      error={errors.experience}
                    />

                    <FormFeedback>{errors.experience}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 6 }}>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="name">
                      Votre disponibilité
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    </Label>
                    <DatePicker
                      defaultValue={selectedDay}
                      local={"fr"}
                      className={"hamza"}
                      getDate={this.getDate}
                    />
                    <FormFeedback>{errors.disponibility}</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
            </ListGroup>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <ListGroup tag="div" className="Profil-group">
              <span className="Profil-header">CV et lettre de motivation</span>

              <Row style={{ marginBottom: 20 }}>
                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-left">
                  <span className="Profil-subheader">CV Français</span>
                  <div>
                    <Input
                      style={{ visibility: "hidden" }}
                      id="cv"
                      name="cv"
                      type="file"
                      accept="application/pdf"
                      onChange={this.updateDoc}
                    />
                    <Label
                      htmlFor="cv"
                      className="btn text-white Profil-btn__cv">
                      remplacer
                    </Label>
                  </div>
                  <PdfPreview file={file ? file : cv ? cv : null} />
                </Col>

                <Col xs={12} md={6} lg={6} xl={6} className="Profil-col-right">
                  <span className="Profil-subheader">CV Anglais</span>
                  <div>
                    <Input
                      style={{ visibility: "hidden" }}
                      id="cv_eng"
                      name="cv_eng"
                      type="file"
                      accept="application/pdf"
                      onChange={this.updateDoc}
                    />
                    <Label
                      htmlFor="cv_eng"
                      className="btn text-white Profil-btn__cv">
                      remplacer
                    </Label>
                  </div>
                  <PdfPreview
                    file={file_eng ? file_eng : cv_eng ? cv_eng : null}
                  />
                </Col>
              </Row>
              <span className="Profil-subheader">Lettre de motivation</span>
              <Row style={{ marginTop: 20 }}>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-left">
                  <FormGroup>
                    <Label className="Profil-group__label" for="template">
                      Template
                    </Label>
                    <EditorHtml
                      isLetter={true}
                      description={this.state.letter}
                      setDescriptionRef={this.setTemplateRef}
                    />
                    <FormFeedback>{errors.template}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} className="Profil-col-right">
                  <PreviewLetter template={this.state.letter} />
                </Col>
              </Row>
            </ListGroup>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => this.props.history.goBack()}
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
const UPDATE_CANDIDAT = gql`
  mutation updateCandidatDetails($id: ID!, $input: CandidatDetailsInput!) {
    updateCandidatDetails(id: $id, input: $input) {
      id
    }
  }
`;

const ADD_CV = gql`
  mutation addCV($id: ID, $file: Upload!, $type: String!) {
    addCV(id: $id, file: $file, type: $type) {
      id
    }
  }
`;
export default withRouter(
  compose(
    graphql(UPDATE_CANDIDAT, {
      name: "updateCandidat",
    }),

    graphql(ADD_CV, {
      name: "addCV",
    }),
    graphql(GET_COMPETENCES, {
      options: () => ({
        variables: {
          skip: 0,
          limit: 0,
        },
      }),
      props: ({ data: { loading, error, getCompetences } }) => ({
        loading,
        error,
        getCompetences,
      }),
    }),
    graphql(GET_JOBS, {
      options: () => ({
        variables: {
          search: "",
          skip: 0,
          limit: 0,
        },
      }),
      props: ({ data: { loading, error, getJobs } }) => ({
        loading,
        error,
        getJobs,
      }),
    })
  )(ProfileForm)
);
