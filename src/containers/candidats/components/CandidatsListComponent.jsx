import React, { Component } from "react";
import {
  ReactiveBase,
  ReactiveList,
  MultiList,
  SelectedFilters,
  DataSearch,
} from "toolynk-reactivesearch";
import PropTypes from "prop-types";
import { Row, Col, Input, Container } from "reactstrap";
import * as moment from "moment";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import CandidatItem from "../../candidat/components/CandidatItem";
import CollapseFilter from "../../../shared/components/CollapseFilter";
import {
  experienceConst,
  etudeConst,
  BASE_URL,
} from "../../../handler/utils/constants";
import Icon from "../../../shared/components/Icon";
import Alert from "../../../handler/utils/Alert";
import Button from "../../../shared/components/Button";

class MyCVComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "name",
      sort: "",
    };
  }
  static propTypes = {
    exportCandidates: PropTypes.func,
  };
  _handleExport = () => {
    this.props
      .exportCandidates()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportCandidates}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          console.log("respoonseee", response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Candidats" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des candidats");
          }
        );
      });
  };
  onResultStats = (results, time) => (
    <div
      style={{
        justifyContent: "flex-end",
        marginLeft: "1%",
        marginTop: "1%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "10px",
      }}>
      <span style={{ fontSize: "14px" }}>
        {results} candidat(s) trouvé(s) en {time}ms
      </span>
    </div>
  );

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Container id="app">
        <ReactiveBase
          app="boostmyjob"
          url="https://elastic.toolynk-lab.com"
          type="candidats">
          <Row className="MyCV-row__top">
            <Col
              md={6}
              lg={9}
              xl={9}
              style={{ marginRight: 0, paddingRight: 0 }}>
              <DataSearch
                componentId="SearchSensor"
                dataField={
                  this.state.select === "name"
                    ? ["first_name", "last_name"]
                    : this.state.select === "in_cv"
                    ? ["cv_data"]
                    : ["cv_eng_data"]
                }
                placeholder="Rechercher"
                queryFormat="or"
                fuzziness={1}
                fieldWeights={[1, 3, 5]}
                onSuggestion={(suggestion) => ({
                  label: (
                    <div>
                      <span
                        style={{
                          fontWeight: "500",
                          textTransform: "uppercase",
                          color: "rgba(41, 94, 190, 1)",
                        }}>
                        {suggestion._source.last_name}
                      </span>
                      <span
                        style={{
                          fontWeight: "500",
                          marginLeft: 2,
                          textTransform: "uppercase",
                          color: "rgba(41, 94, 190, 1)",
                        }}>
                        {suggestion._source.first_name}
                      </span>
                      {suggestion._source.jobs &&
                        suggestion._source.jobs.length > 0 && (
                          <span
                            style={{
                              fontWeight: "400",
                              marginLeft: 2,
                              textTransform: "capitalize",
                            }}>
                            <Icon className="MyCV-icon" name="candidat-brief" />{" "}
                            {suggestion._source.jobs}
                          </span>
                        )}
                      {suggestion._source.experience &&
                        suggestion._source.experience.length > 0 && (
                          <span
                            style={{
                              fontWeight: "400",
                              marginLeft: 2,
                              textTransform: "capitalize",
                            }}>
                            <Icon className="MyCV-icon" name="candidat-test" />
                            {
                              experienceConst.filter(
                                (etude) =>
                                  etude.value === suggestion._source.experience
                              )[0].label
                            }
                          </span>
                        )}
                      {suggestion._source.disponibility && (
                        <span
                          style={{
                            fontWeight: "400",
                            marginLeft: 2,
                            textTransform: "capitalize",
                          }}>
                          <Icon className="MyCV-icon" name="candidat-time" />
                          {moment(suggestion._source.disponibility).diff(
                            moment(),
                            "days"
                          ) > 0
                            ? " Dans " +
                              moment(suggestion._source.disponibility).diff(
                                moment(),
                                "days"
                              ) +
                              " jours"
                            : " Immédiate"}
                        </span>
                      )}
                    </div>
                  ),
                  value: suggestion._source.first_name,
                })}
                renderNoSuggestion={() => <div>Aucun résultat trouvé</div>}
                react={{
                  and: [
                    "CompetenceSensor",
                    "jobSensor",
                    "citySensor",
                    "etudeSensor",
                    "experienceSensor",
                    "DataSensor",
                    "contractSensor",
                    "shareSensor",
                  ],
                }}
                showFilter={true}
                filterLabel="Recherche"
                URLParams={false}
              />
            </Col>
            <Col md={6} lg={3} xl={3} style={{ marginLeft: 0, paddingLeft: 0 }}>
              <Input
                className="MyCV-search__select"
                value={this.state.select}
                type="select"
                name={"select"}
                onChange={(e) => this.handleChange(e)}>
                <option value={"name"} key={1}>
                  DANS LE NOM
                </option>
                <option
                  style={{ textTransform: "uppercase" }}
                  value={"in_cv"}
                  key={2}>
                  DANS LE CV FRANçAIS
                </option>
                <option value={"in_cv_eng"} key={3}>
                  DANS LE CV ANGLAIS
                </option>
              </Input>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={4} xl={3} className="MyCV-col__left">
              <CollapseFilter
                label={"FILTRES"}
                icon={true}
                isOpen={true}
                className="MyCV-button__filter-name">
                <CollapseFilter label={"Métier"}>
                  <MultiList
                    componentId="jobSensor"
                    placeholder="Rechercher"
                    queryFormat="or"
                    selectAllLabel="Tous"
                    filterLabel="Métiers"
                    dataField="jobs.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">{label}</span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "CompetenceSensor",
                        "citySensor",
                        "etudeSensor",
                        "experienceSensor",
                        "DataSensor",
                        "contractSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
                <CollapseFilter label={"Partage"}>
                  <MultiList
                    componentId="shareSensor"
                    placeholder="Rechercher"
                    showSearch={false}
                    queryFormat="or"
                    selectAllLabel="Tous"
                    filterLabel="Partage"
                    dataField="sharedby.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">{label}</span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "shareSensor",
                        "SearchSensor",
                        "CompetenceSensor",
                        "jobSensor",
                        "citySensor",
                        "etudeSensor",
                        "experienceSensor",
                        "DataSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
                <CollapseFilter label={"Contrat"}>
                  <MultiList
                    componentId="contractSensor"
                    queryFormat="or"
                    showSearch={false}
                    filterLabel="Contrat"
                    selectAllLabel="Tous"
                    dataField="contract.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">{label}</span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "CompetenceSensor",
                        "jobSensor",
                        "citySensor",
                        "etudeSensor",
                        "experienceSensor",
                        "DataSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
                <CollapseFilter label={"Niveau d'étude"}>
                  <MultiList
                    componentId="etudeSensor"
                    queryFormat="or"
                    showSearch={false}
                    filterLabel="Niveau d'étude"
                    selectAllLabel="Tous"
                    dataField="etude.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">
                          {
                            etudeConst.filter(
                              (etude) => etude.value === label
                            )[0].label
                          }
                        </span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "CompetenceSensor",
                        "jobSensor",
                        "citySensor",
                        "experienceSensor",
                        "DataSensor",
                        "contractSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
                <CollapseFilter label={"Compétences"}>
                  <MultiList
                    componentId="CompetenceSensor"
                    placeholder="Rechercher"
                    queryFormat="or"
                    selectAllLabel="Toutes"
                    filterLabel="Compétences"
                    dataField="competences.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">{label}</span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "jobSensor",
                        "citySensor",
                        "etudeSensor",
                        "experienceSensor",
                        "DataSensor",
                        "contractSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>

                <CollapseFilter label={"Expérience"}>
                  <MultiList
                    componentId="experienceSensor"
                    queryFormat="or"
                    showSearch={false}
                    filterLabel="Expérience"
                    selectAllLabel="Toutes"
                    dataField="experience.keyword"
                    renderListItem={(a, count) => (
                      <div>
                        <span className="MyCV-label__filter">
                          {
                            experienceConst.filter(
                              (etude) => etude.value === a
                            )[0].label
                          }
                        </span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "competenceSensor",
                        "jobSensor",
                        "citySensor",
                        "etudeSensor",
                        "DataSensor",
                        "contractSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
                <CollapseFilter label={"Localisation"}>
                  <MultiList
                    componentId="citySensor"
                    queryFormat="or"
                    placeholder="Ville"
                    filterLabel="Ville"
                    selectAllLabel="Toutes"
                    dataField="city.keyword"
                    renderListItem={(label, count) => (
                      <div>
                        <span className="MyCV-label__filter">{label}</span>
                        <span className="MyCV-label__count">({count})</span>
                      </div>
                    )}
                    react={{
                      and: [
                        "SearchSensor",
                        "competenceSensor",
                        "jobSensor",
                        "experienceSensor",
                        "etudeSensor",
                        "DataSensor",
                        "contractSensor",
                        "shareSensor",
                      ],
                    }}
                  />
                </CollapseFilter>
              </CollapseFilter>
            </Col>

            <Col md={12} lg={8} xl={9}>
              <div>
                <Button
                  className="butn"
                  size="lg"
                  text="EXPORTER"
                  color="primary"
                  style={{
                    position: "absolute",
                    top: "-1.2rem",
                    right: "1rem",
                    width: "15%",
                  }}
                  onClick={this._handleExport}
                />
              </div>
              <SelectedFilters showClearAll={true} clearAllLabel="Effacer" />
              <ReactiveList
                componentId="SearchResult"
                dataField="first_name.keyword"
                className="result-list-container"
                onResultStats={this.onResultStats}
                pagination
                size={4}
                sortOptions={[
                  {
                    label: "LES PLUS RÉCENTS",
                    dataField: "createdAt",
                    sortBy: "desc",
                  },
                  {
                    label: "A-Z",
                    dataField: "first_name.keyword",
                    sortBy: "asc",
                  },
                  {
                    label: "DISPONIBILITÉ",
                    dataField: "disponibility",
                    sortBy: "asc",
                  },
                ]}
                onNoResults="Aucun candidat n'a été trouvé"
                onData={(data) => this.onData(data)}
                react={{
                  and: [
                    "SearchSensor",
                    "CompetenceSensor",
                    "jobSensor",
                    "citySensor",
                    "etudeSensor",
                    "experienceSensor",
                    "DataSensor",
                    "contractSensor",
                    "shareSensor",
                  ],
                }}
              />
            </Col>
          </Row>
        </ReactiveBase>
      </Container>
    );
  }

  onData = (data) => {
    return <CandidatItem candidat={data} key={data._id} shared={false} />;
  };
}
const EXPORT_CANDIDATES = gql`
  mutation exportCandidates {
    exportCandidates
  }
`;
export default compose(
  graphql(EXPORT_CANDIDATES, { name: "exportCandidates" })
)(MyCVComponent);
