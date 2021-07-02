import gql from "graphql-tag";
import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { compose, graphql, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import {
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ListGroup,
  Row
} from "reactstrap";
import {
  GET_COMPETENCES,
  GET_ENTREPRISES_LISTE,
  GET_JOBS,
  GET_OFFERS_BY_STATUS
} from "../../../handler/queries";
import Alert from "../../../handler/utils/Alert";
import {
  dureeFormation,
  typeFormation
} from "../../../handler/utils/constants";
import Autosuggestion from "../../../shared/components/Autosuggestion";
import Button from "../../../shared/components/Button";
import DatePicker from "../../../shared/components/DatePicker";
import EditorHtml from "../../../shared/components/Editor";
import GraphQLResult from "../../../shared/components/GraphQLResult";
import Select from "../../../shared/components/Select";
import StickyLabels from "../../../shared/components/StickyLabels";
import AutosuggestionEntreprise from "../../add-actualité/components/Autosuggestion";
import ModalPreview from "./ModalPreview";

//const logo = `${process.env.PUBLIC_URL}/img/images/banner.png`;

const defaultErrors = {
  startApply: null,
  auteur: null,
  endApply: null,
  dureeFormation: null,
  typeFormation: null,
  endEducation: null,
  competences: null,
  startInternship: null,
  endInternship: null,
  jobs: null,
  jobsuggestions: null,
  suggestions: null,
  description_poste: null,
  name: null
};

class OfferFormationForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    handleChangeForm: PropTypes.func,
    refetch: PropTypes.func,
    className: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    handleChangeUpdate: PropTypes.func,
    getCompetences: PropTypes.object,
    getJobs: PropTypes.object,
    addOffer: PropTypes.func,
    updateOffer: PropTypes.func,
    duplicateOffer: PropTypes.func,
    loading: PropTypes.bool,
    offer: PropTypes.object,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: "Profil",
    title: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modal: false,
      startApply: props.offer ? new Date(props.offer.startApply) : new Date(),
      endApply: props.offer
        ? new Date(props.offer.endApply)
        : new Date(new Date().setMonth(new Date().getMonth() + 1)),
      startEducation: props.offer
        ? new Date(props.offer.startEducation)
        : new Date(new Date().setMonth(new Date().getMonth() + 2)),
      endEducation: props.offer
        ? new Date(props.offer.endEducation)
        : new Date(new Date().setMonth(new Date().getMonth() + 3)),
      startInternship: props.offer
        ? new Date(props.offer.startInternship)
        : new Date(new Date().setMonth(new Date().getMonth() + 2)),
      endInternship: props.offer
        ? new Date(props.offer.endInternship)
        : new Date(new Date().setMonth(new Date().getMonth() + 3)),
      description: props.offer ? props.offer.description_poste : null,
      name: props.offer ? props.offer.name : null,
      suggestions: props.offer ? props.offer.competences : [],
      suggestionsEntreprise: [],
      jobsuggestions: props.offer ? props.offer.jobs : [],
      offer: {},
      typeFormation: props.offer ? props.offer.typeFormation : null,
      ent_type: props.offer ? props.offer.offreType : null,
      search: "",
      search2:
        props.offer && props.offer.entreprise.name
          ? props.offer.entreprise.name
          : "",
      errors: {
        ...defaultErrors
      }
    };
    this.toggleFile = this.toggleFile.bind(this);
  }
  description = this.props.offer ? this.props.offer.description_poste : "";
  setRef = ref => {
    if (ref) this[ref.name] = ref;
  };
  getValue = value => {
    this.setState({ name: value });
  };
  pushSelectedJob = suggestion => {
    this.setState({ job_id: suggestion.id });
  };
  setDescriptionRef = ref => {
    if (ref) this.description = ref;
  };

  onSelect = (value, name) => {
    this.setState({ [name]: value });
  };
  _handleChangeUpdate = () => {
    this.props.handleChangeUpdate();
  };
  pushSelectedSuggestion = suggestion => {
    if (this.state.suggestions.indexOf(suggestion) === -1) {
      let suggestions = [];
      suggestions.push(suggestion);
      this.setState({ suggestions: suggestions });
    }
  };
  delete = index => {
    let hamza = this.state.suggestions;
    hamza.splice(index, 1);
    this.setState({ suggestions: hamza });
  };
  pushSelectedJobSuggestion = suggestion => {
    if (this.state.jobsuggestions.indexOf(suggestion) === -1) {
      let jobsuggestions = this.state.jobsuggestions;
      jobsuggestions.push(suggestion);
      this.setState({ jobsuggestions: jobsuggestions });
    }
  };
  deleteJob = index => {
    let hamza = this.state.jobsuggestions;
    hamza.splice(index, 1);
    this.setState({ jobsuggestions: hamza });
  };
  pushSelectedEcoleSuggestion = suggestion => {
    if (this.state.suggestionsEntreprise.indexOf(suggestion) === -1) {
      let suggestionsEntreprise = [];
      suggestionsEntreprise.push(suggestion);
      this.setState({ suggestionsEntreprise: suggestionsEntreprise });
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
  getDate = selectedDay => {
    this.setState({ selectedDay });
  };

  _handleSubmit = () => {
    if (this.props.type === "add") {
      this._handleAdd();
    }
    if (this.props.type === "update") {
      this._handleUpdate();
    }
  };
  _handlePreview = () => {
    if (!this.state.loading) {
      const name = this.state.name ? this.state.name.trim() : null;
      const auteur =
        this.state.suggestionsEntreprise.length > 0
          ? this.state.suggestionsEntreprise[0].name
          : this.state.search2;
      const entreprise_id =
        this.state.suggestionsEntreprise.length > 0
          ? this.state.suggestionsEntreprise[0].id
          : "";

      let competences_ids = [];
      let jobs_ids = [];
      if (this.state.suggestions.length !== 0) {
        this.state.suggestions.map(item => {
          competences_ids.push(item.id);
        });
      }
      if (this.state.jobsuggestions.length !== 0) {
        this.state.jobsuggestions.map(item => {
          jobs_ids.push(item.id);
        });
      }
      const description_poste = this.description.trim();
      const {
        typeFormation,
        startApply,
        endApply,
        startEducation,
        endEducation,
        startInternship,
        endInternship
      } = this.state;
      const errors = {
        ...defaultErrors
      };
      if (endApply == "Invalid Date")
        errors.endApply = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startApply).format("YYYY-MM-DD")).isAfter(
          moment(startApply).format("YYYY-MM-DD")
        )
      )
        errors.endApply =
          "La fin de publication doit être après la date de début";

      if (endEducation == "Invalid Date")
        errors.endEducation = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startEducation).format("YYYY-MM-DD")).isAfter(
          moment(startEducation).format("YYYY-MM-DD")
        )
      )
        errors.endEducation =
          "La fin de publication doit être après la date de début";
      if (!typeFormation)
        errors.typeFormation = "Veuillez sélectionner le type de la formation";

      if (this.state.suggestions.length == 0)
        errors.suggestions = "Vous devez renseigner au moins 1 compétence";
      if (entreprise_id == "" && auteur == "")
        errors.auteur =
          "Vous devez renseigner l'école responsable de cette formation";
      if (this.state.jobsuggestions.length < 1)
        errors.jobsuggestions = "Vous devez renseigner au moins un métier";
      if (description_poste.length > 1000 && description_poste.length < 300)
        errors.description_poste =
          "La description de l'offre est obligatoire et doit comporter au moins 100 caractères";
      if (endInternship == "Invalid Date")
        errors.endInternship = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startInternship).format("YYYY-MM-DD")).isAfter(
          moment(endInternship).format("YYYY-MM-DD")
        ) ||
        moment(moment(startEducation).format("YYYY-MM-DD")).isAfter(
          moment(startInternship).format("YYYY-MM-DD")
        )
      )
        errors.endInternship =
          "La date de fin du de la période en entreprise doit être antérieure à celle de la formation";

      if (
        errors.endApply ||
        errors.endEducation ||
        errors.typeFormation ||
        errors.suggestions ||
        errors.jobsuggestions ||
        errors.description_poste ||
        errors.endInternship ||
        errors.auteur
      ) {
        console.log("errors", errors);
        console.log("this.state", this.state);
        this.setState({ errors: { ...errors } });
        Alert.warning(
          "Merci de corriger les problèmes identifiés dans le formulaire"
        );
      } else {
        this.setState({ errors });
        this.setState({
          modal: true,
          offer: {
            suggestions: this.state.suggestions,
            jobsuggestions: this.state.jobsuggestions,
            expiredAt: new Date(endApply).getTime(),
            typeFormation,
            description_poste,
            startInternship,
            endInternship,
            startApply,
            endApply,
            startEducation,
            endEducation,
            name,
            auteur
          }
        });
      }
    }
  };
  _handleAdd = () => {
    if (!this.state.loading) {
      const name = this.state.name ? this.state.name.trim() : null;
      const auteur =
        this.state.suggestionsEntreprise.length > 0
          ? this.state.suggestionsEntreprise[0].name
          : this.state.search2;
      const entreprise_id =
        this.state.suggestionsEntreprise.length > 0
          ? this.state.suggestionsEntreprise[0].id
          : "";

      let competences_ids = [];
      let jobs_ids = [];
      if (this.state.suggestions.length != 0) {
        this.state.suggestions.map(item => {
          competences_ids.push(item.id);
        });
      }
      if (this.state.jobsuggestions.length !== 0) {
        this.state.jobsuggestions.map(item => {
          jobs_ids.push(item.id);
        });
      }
      const description_poste = this.description.trim();
      const {
        typeFormation,
        startApply,
        endApply,
        startEducation,
        endEducation,
        startInternship,
        dureeFormation,
        endInternship
      } = this.state;
      const job_id = jobs_ids ? jobs_ids[0] : null;

      const errors = {
        ...defaultErrors
      };
      if (name.length < 2) errors.name = "Le nom de l'offre est obligatoire";
      if (endApply == "Invalid Date")
        errors.endApply = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startApply).format("YYYY-MM-DD")).isAfter(
          moment(startApply).format("YYYY-MM-DD")
        )
      )
        errors.endApply =
          "La fin de publication doit être après la date de début";

      if (endEducation == "Invalid Date")
        errors.endEducation = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startEducation).format("YYYY-MM-DD")).isAfter(
          moment(startEducation).format("YYYY-MM-DD")
        )
      )
        errors.endEducation =
          "La fin de publication doit être après la date de début";
      if (!typeFormation)
        errors.typeFormation = "Veuillez sélectionner le type de la formation";
      if (!dureeFormation)
        errors.dureeFormation =
          "Veuillez sélectionner la Durée du la formation";

      if (endInternship == "Invalid Date")
        errors.endInternship = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startInternship).format("YYYY-MM-DD")).isAfter(
          moment(endInternship).format("YYYY-MM-DD")
        ) ||
        moment(moment(startEducation).format("YYYY-MM-DD")).isAfter(
          moment(startInternship).format("YYYY-MM-DD")
        )
      )
        errors.endInternship =
          "La fin de la période en entreprise doit être synchronisé avec la date de fin de la formation";
      if (entreprise_id == "" && auteur == "")
        errors.auteur =
          "Vous devez renseigner l'école responsable de cette formation";

      if (this.state.suggestions.length === 0)
        errors.suggestions = "Vous devez renseigner au moins 1 compétence";
      if (this.state.jobsuggestions.length < 1)
        errors.jobsuggestions = "Vous devez renseigner au moins un métier";
      if (description_poste.length > 1000 && description_poste.length < 300)
        errors.description_poste =
          "La description de l'offre est obligatoire et doit comporter au moins 100 caractères";

      if (
        errors.name ||
        errors.endApply ||
        errors.endEducation ||
        errors.typeFormation ||
        errors.suggestions ||
        errors.jobsuggestions ||
        errors.description_poste ||
        errors.endInternship ||
        errors.auteur ||
        errors.dureeFormation
      ) {
        this.setState({ errors: { ...errors } });
        Alert.warning(
          "Merci de corriger les problèmes identifiés dans le formulaire"
        );
      } else {
        this.setState({ loading: true, errors });
        this.props
          .addOffer({
            variables: {
              competences_ids,
              typeFormation,
              job_id,
              dureeFormation,
              input: {
                offreType: "EDUCATION",
                jobs_ids,
                expiredAt: new Date(endApply).getTime(),
                description_poste,
                startInternship,
                endInternship,
                startApply,
                endApply,
                startEducation,
                endEducation,
                name,
                entreprise_id
              }
            },
            refetchQueries: [
              {
                query: GET_OFFERS_BY_STATUS,
                variables: {
                  state: "DRAFT",
                  search: "",
                  skip: 0,
                  limit: 99,
                  field: "name",
                  direction: 1,
                  ent_type: "ecole"
                }
              }
            ]
          })
          .then(() => {
            this.props.history.push({
              pathname: "/formations",
              state: { status: "DRAFT" }
            });
          })
          .catch(e => {
            this.onResponse(() => {
              console.log(e);
            });
          });
      }
    }
  };
  onChangeTitle = event => {
    this.setState({ name: event.target.value });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      offer: {}
    });
  };
  _handleUpdate = () => {
    if (!this.state.loading) {
      const name = this.state.name
        ? this.state.name.trim()
        : this.props.offer.name;
      const entreprise_id =
        this.state.suggestionsEntreprise.length > 0
          ? this.state.suggestionsEntreprise[0].id
          : "";
      let competences_ids = [];
      let jobs_ids = [];
      if (this.state.suggestions.length !== 0) {
        this.state.suggestions.map(item => {
          competences_ids.push(item.id);
        });
      }
      if (this.state.jobsuggestions.length !== 0) {
        this.state.jobsuggestions.map(item => {
          jobs_ids.push(item.id);
        });
      }
      const description_poste = this.description.trim();
      const {
        typeFormation,
        startApply,
        dureeFormation,
        endApply,
        startEducation,
        endEducation,
        startInternship,
        endInternship
      } = this.state;
      const job_id = jobs_ids ? jobs_ids[0] : null;

      const errors = {
        ...defaultErrors
      };

      if (name.length < 2) errors.name = "Le nom de l'offre est obligatoire";

      if (endApply == "Invalid Date")
        errors.endApply = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startApply).format("YYYY-MM-DD")).isAfter(
          moment(startApply).format("YYYY-MM-DD")
        )
      )
        errors.endApply =
          "La fin de publication doit être après la date de début";

      if (endEducation == "Invalid Date")
        errors.endEducation = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startEducation).format("YYYY-MM-DD")).isAfter(
          moment(startEducation).format("YYYY-MM-DD")
        )
      )
        errors.endEducation =
          "La fin de publication doit être après la date de début";
      if (!typeFormation)
        errors.typeFormation = "Veuillez sélectionner le type de la formation";
      if (!dureeFormation)
        errors.dureeFormation =
          "Veuillez sélectionner la Durée du la formation";

      if (this.state.suggestions.length === 0)
        errors.suggestions = "Vous devez renseigner au moins 1 compétence";
      if (this.state.jobsuggestions.length < 1)
        errors.jobsuggestions = "Vous devez renseigner au moins un métier";
      if (description_poste.length > 1000 && description_poste.length < 300)
        errors.description_poste =
          "La description de l'offre est obligatoire et doit comporter au moins 100 caractères";

      if (endInternship == "Invalid Date")
        errors.endInternship = "Veuillez renseigner une date de fin";
      else if (
        moment(moment(startInternship).format("YYYY-MM-DD")).isAfter(
          moment(endInternship).format("YYYY-MM-DD")
        ) ||
        moment(moment(endInternship).format("YYYY-MM-DD")).isAfter(
          moment(endEducation).format("YYYY-MM-DD")
        )
      )
        errors.endInternship =
          "La fin de la période en entreprise doit être synchronisée avec la date de fin de la formation";

      if (
        errors.name ||
        errors.endApply ||
        errors.endEducation ||
        errors.typeFormation ||
        errors.suggestions ||
        errors.jobsuggestions ||
        errors.description_poste ||
        errors.endInternship ||
        errors.dureeFormation
      ) {
        this.setState({ errors: { ...errors } });
        Alert.warning(
          "Merci de corriger les problèmes identifiés dans le formulaire"
        );
      } else {
        this.setState({ loading: true, errors });
        this.props
          .updateOffer({
            variables: {
              id: this.props.offer.id,
              competences_ids,
              typeFormation,
              dureeFormation,
              job_id,
              input: {
                offreType: "EDUCATION",
                jobs_ids,
                expiredAt: new Date(endApply).getTime(),
                description_poste,
                startInternship,
                endInternship,
                startApply,
                endApply,
                startEducation,
                endEducation,
                name,
                entreprise_id
              }
            },
            refetchQueries: [
              {
                query: GET_OFFERS_BY_STATUS,
                variables: {
                  state: "DRAFT",
                  search: "",
                  skip: 0,
                  limit: 4,
                  field: "name",
                  direction: 1,
                  ent_type: "ecole"
                }
              }
            ]
          })
          .then(() => {
            this.setState({ loading: false });
            this.props.refetch();
            this.props.history.push({
              pathname: "/formations",
              state: {}
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };

  _handleDuplicate = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });

      this.props
        .duplicateOffer({
          variables: {
            id: this.props.offer.id
          },
          refetchQueries: [
            {
              query: GET_OFFERS_BY_STATUS,
              variables: {
                state: "DRAFT",
                search: "",
                skip: 0,
                limit: 10,
                field: "name",
                direction: 1,
                ent_type: "ecole"
              }
            }
          ]
        })
        .then(() => {
          this.setState({ loading: false });
          this.props.refetch();
          this.props.history.push({
            pathname: "/formations",
            state: {}
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  onOpenModal = () => {
    this.setState({ modalFile: !this.state.modalFile });
  };

  toggleFile() {
    this.setState({
      modalFile: !this.state.modalFile
    });
  }
  render() {
    const {
      errors,
      modal,
      offer,
      suggestions,
      jobsuggestions,
      name,
      search,
      search2
    } = this.state;
    const { error, getCompetences, loading, getJobs, type } = this.props;

    return (
      <GraphQLResult
        loading={loading}
        error={error}
        emptyResult={
          !loading &&
          getCompetences &&
          getCompetences.totalcount === 0 &&
          getJobs &&
          getJobs.totalcount === 0
        }
      >
        <ModalPreview modal={modal} offer={offer} toggleModal={this.toggle} />
        <CardBody>
          {this.props.type === "update" && (
            <div className="btn_dup">
              <Button
                onClick={this._handleDuplicate}
                className="Profil-btn__duplicate"
                size="lg"
                text="DUPLIQUER"
                color="primary"
                loading={this.state.loading}
              />
            </div>
          )}

          <ListGroup
            tag="div"
            className="Profil-group n"
            style={{ marginTop: this.props.type === "update" && "4em" }}
          >
            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={12} lg={12} xl={12}>
                <FormGroup>
                  <Label className="Profil-group__label" for="title">
                    Titre de la formation
                    <span style={{ marginLeft: 5, color: "red" }}>*</span>
                  </Label>
                  <Input
                    className="Profil-group__input"
                    onChange={this.onChangeTitle}
                    defaultValue={name}
                    name="title"
                    type="text"
                    placeholder="Saisie le titre de formation"
                    invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span className="span-error">{errors.name}</span>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={12} lg={12} xl={12}>
                <Query
                  query={GET_ENTREPRISES_LISTE}
                  variables={{
                    search: search,
                    status: "ecole"
                  }}
                >
                  {({
                    data: { getEntrepriseAutocomplete },
                    loading,
                    error
                  }) => {
                    if (loading) return <div />;
                    else if (error) return <p>ERROR</p>;
                    return (
                      <div>
                        <FormGroup>
                          <Label className="Profil-group__label" for="name">
                            École{" "}
                            {this.props.type === "add" && (
                              <span style={{ marginLeft: 5, color: "red" }}>
                                *
                              </span>
                            )}
                          </Label>
                          <AutosuggestionEntreprise
                            items={
                              getEntrepriseAutocomplete &&
                              getEntrepriseAutocomplete.entreprises
                                ? getEntrepriseAutocomplete.entreprises
                                : []
                            }
                            defaultValue={search2}
                            pushSelectedSuggestion={
                              this.pushSelectedEcoleSuggestion
                            }
                          />
                          {errors.auteur && (
                            <span className="span-error">{errors.auteur}</span>
                          )}
                        </FormGroup>
                      </div>
                    );
                  }}
                </Query>
              </Col>
            </Row>
            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de début de la formation{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.startEducation
                        : this.state.startEducation
                    }
                    getDate={selectedDate =>
                      this.setState({ startEducation: selectedDate })
                    }
                  />
                  <FormFeedback>{errors.startEducation}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de fin de la formation{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.endEducation
                        : this.state.endEducation
                    }
                    getDate={selectedDate =>
                      this.setState({ endEducation: selectedDate })
                    }
                  />
                  <FormFeedback>{errors.endEducation}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de début de réception des candidatures{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.startApply
                        : this.state.startApply
                    }
                    getDate={selectedDate =>
                      this.setState({ startApply: selectedDate })
                    }
                  />
                  <FormFeedback>{errors.startApply}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de fin de réception des candidatures{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.endApply
                        : this.state.endApply
                    }
                    getDate={selectedDate =>
                      this.setState({ endApply: selectedDate })
                    }
                  />
                  <FormFeedback>{errors.endApply}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Type de la formation{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <Select
                    className="Profil-group__input"
                    onSelect={this.onSelect}
                    defaultValue={
                      this.props.offer && this.props.offer.typeFormation
                    }
                    name={"typeFormation"}
                    optionLabelDisabled={false}
                    items={typeFormation}
                    error={errors.typeFormation}
                  />

                  <FormFeedback>{errors.typeFormation}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Niveau d'étude{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <Select
                    className="Profil-group__input"
                    onSelect={this.onSelect}
                    defaultValue={
                      this.props.offer && this.props.offer.dureeFormation
                    }
                    name={"dureeFormation"}
                    optionLabelDisabled={false}
                    items={dureeFormation}
                    error={errors.dureeFormation}
                  />

                  <FormFeedback>{errors.dureeFormation}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de début de la période en entreprise{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.startInternship
                        : this.state.startInternship
                    }
                    getDate={selectedDate =>
                      this.setState({ startInternship: selectedDate })
                    }
                  />
                  <FormFeedback>{errors.endInternship}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Date de fin de la période en entreprise{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <DatePicker
                    local={"fr"}
                    className={"hamza"}
                    defaultValue={
                      this.props.offer
                        ? this.props.offer.endInternship
                        : this.state.endInternship
                    }
                    getDate={selectedDate =>
                      this.setState({ endInternship: selectedDate })
                    }
                  />
                  <FormFeedback style={{ display: "block" }}>
                    {errors.endInternship}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Compétences enseignées{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <Autosuggestion
                    items={
                      getCompetences && getCompetences.competences
                        ? getCompetences.competences
                        : []
                    }
                    pushSelectedSuggestion={this.pushSelectedSuggestion}
                  />
                  <FormFeedback>{errors.competences}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label
                    className="Profil-group__label"
                    for="name"
                    style={{ color: "white" }}
                  >
                    SONT
                  </Label>
                  <StickyLabels
                    items={suggestions}
                    delete={this.delete}
                    enableDelete={true}
                    className="sticky-labes"
                  />
                  {errors.suggestions && (
                    <span className="span-error">{errors.suggestions}</span>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Métiers concernés par la formation{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <Autosuggestion
                    placeholderr="Métiers recherchées..."
                    items={getJobs && getJobs.jobs ? getJobs.jobs : []}
                    pushSelectedSuggestion={this.pushSelectedJobSuggestion}
                  />
                  <FormFeedback>{errors.jobs}</FormFeedback>
                </FormGroup>
              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label
                    className="Profil-group__label"
                    for="name"
                    style={{ color: "white" }}
                  >
                    SONT
                  </Label>
                  <StickyLabels
                    items={jobsuggestions}
                    delete={this.deleteJob}
                    enableDelete={true}
                    className="sticky-labes"
                  />
                  {errors.jobsuggestions && (
                    <span className="span-error">{errors.jobsuggestions}</span>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 6 }}>
              <Col xs={12} md={12} lg={12} xl={12}>
                <FormGroup>
                  <Label className="Profil-group__label" for="name">
                    Description de la formation{" "}
                    {this.props.type === "add" && (
                      <span style={{ marginLeft: 5, color: "red" }}>*</span>
                    )}
                  </Label>
                  <EditorHtml
                    description={this.description}
                    placeholder={
                      "Saisissez la description de votre formation..."
                    }
                    setDescriptionRef={this.setDescriptionRef}
                  />
                  {errors.description_poste && (
                    <span className="span-error">
                      {errors.description_poste}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </ListGroup>

          <div className="Profil-btns">
            <Button
              onClick={() =>
                this.props.history.push({
                  pathname: "/formations",
                  state: { status: "ACTIF" }
                })
              }
              className="Profil-btn__cancel"
              size="lg"
              text="Annuler"
              color="secondary"
              loading={this.state.loading}
            />
            <Button
              onClick={this._handlePreview}
              className="Profil-btn__preview"
              size="lg"
              text={"prévisualiser"}
              loading={this.state.loading}
            />
            <Button
              onClick={this._handleSubmit}
              className="Profil-btn__success"
              size="lg"
              text={"SAUVEGARDER"}
              color="primary"
              loading={this.state.loading}
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: 15
            }}
          >
            {type === "add" && (
              <span
                style={{
                  color: "gray",
                  fontSize: "1.1em"
                }}
              >
                * Après avoir sauvegardé cette offre, vous pourrez la retrouver
                dans la liste des offres au statut « Brouillon »
              </span>
            )}
          </div>
        </CardBody>
      </GraphQLResult>
    );
  }
}
const ADD_OFFER = gql`
  mutation addOffer(
    $file: Upload
    $extra_file: Upload
    $competences_ids: [ID!]
    $typeFormation: String
    $dureeFormation: String
    $job_id: ID
    $input: OfferInput!
  ) {
    addOffer(
      file: $file
      extra_file: $extra_file
      job_id: $job_id
      typeFormation: $typeFormation
      dureeFormation: $dureeFormation
      competences_ids: $competences_ids
      input: $input
    ) {
      name
    }
  }
`;

const UPDATE_OFFER = gql`
  mutation updateOffer(
    $file: Upload
    $extra_file: Upload
    $competences_ids: [ID!]
    $typeFormation: String
    $dureeFormation: String
    $job_id: ID
    $id: ID!
    $input: OfferInput!
  ) {
    updateOffer(
      file: $file
      extra_file: $extra_file
      job_id: $job_id
      typeFormation: $typeFormation
      dureeFormation: $dureeFormation
      id: $id
      competences_ids: $competences_ids
      input: $input
    ) {
      name
    }
  }
`;
const DUPLICATE_OFFER = gql`
  mutation duplicateOffer($id: ID!) {
    duplicateOffer(id: $id) {
      name
      id
    }
  }
`;
export default withRouter(
  compose(
    graphql(ADD_OFFER, {
      name: "addOffer"
    }),
    graphql(UPDATE_OFFER, {
      name: "updateOffer"
    }),
    graphql(DUPLICATE_OFFER, {
      name: "duplicateOffer"
    }),
    graphql(GET_COMPETENCES, {
      options: () => ({
        variables: {
          search: "",
          skip: 0,
          limit: 0
        }
      }),
      props: ({ data: { loading, error, getCompetences } }) => ({
        loading,
        error,
        getCompetences
      })
    }),
    graphql(GET_JOBS, {
      options: () => ({
        variables: {
          search: "",
          skip: 0,
          limit: 0
        }
      }),
      props: ({ data: { loading, error, getJobs } }) => ({
        loading,
        error,
        getJobs
      })
    })
  )(OfferFormationForm)
);