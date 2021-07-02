import axios from "axios";
import * as moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { compose, graphql, Query } from "react-apollo";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";
import { EXPORT_ECOLE, GET_ENTREPRISES } from "../../handler/queries";
import Alert from "../../handler/utils/Alert";
import { BASE_URL } from "../../handler/utils/constants";
import Button from "../../shared/components/Button";
import Icon from "../../shared/components/Icon";
import Image from "../../shared/components/Image";
import Panel from "../../shared/components/Panel";
class SchoolsList extends React.PureComponent {
  static propTypes = {
    getEntreprises: PropTypes.array,
    refetch: PropTypes.func,
    exportEcole: PropTypes.func,
  };

  static defaultProps = {
    getEntreprises: [],
  };

  state = {
    activePage: 1,
    search: "",
    skip: 1,
    limit: 99,
    ent_type: "ecole",
  };
  _handleExport6 = () => {
    this.props
      .exportEcole()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportEcole}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Écoles" + ".xlsx");
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
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * 2,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { limit, activePage, search } = this.state;
    return (
      <React.Fragment>
        <Row className="Add-row">
          <Col xl={8} lg={8} md={8} sm={12}>
            <Input
              className="Search-input-b"
              onChange={this.onChange}
              type="text"
              value={this.state.search}
              name="search"
              placeholder="Rechercher"
            />
          </Col>
          <Col xl={4} lg={4} md={4} sm={12}>
            <Link className="Link-add" to="/ajouter-ecole">
              Ajouter une nouvelle École
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xl={8} lg={8} md={8} sm={12} />

          <Col
            xl={4}
            lg={4}
            md={4}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}>
            {" "}
            <Button
              className="butn2"
              size="lg"
              text={"Exporter"}
              color="primary"
              style={{
                width: "30%",
                marginRight: "1rem",
              }}
              onClick={this._handleExport6}
            />
          </Col>
        </Row>
        <Query
          query={GET_ENTREPRISES}
          variables={{
            search: search,
            skip: (activePage - 1) * limit,
            limit: limit,
            ent_type: "ecole",
          }}
          fetchPolicy="network-only">
          {({ data: { getEntreprises }, loading, error, refetch }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;
            return (
              <Panel
                xl={12}
                lg={12}
                md={12}
                title="Liste des Écoles"
                refetch={refetch}>
                <Row className="Application" style={{ padding: 30 }}>
                  <Col xl={3} lg={3} md={6} sm={12} className="Application-th">
                    École
                  </Col>
                  <Col xl={4} lg={4} md={6} sm={12} className="Application-th">
                    Responsable
                  </Col>
                  <Col xl={4} lg={4} md={6} sm={12} className="Application-th">
                    Date d'inscription
                  </Col>
                  <Col
                    xl={1}
                    lg={1}
                    md={6}
                    sm={12}
                    className="Application-th"></Col>
                </Row>
                {getEntreprises &&
                  getEntreprises.entreprises &&
                  getEntreprises.entreprises.map((entreprise) => {
                    return (
                      <Row
                        key={entreprise.id}
                        className="Application-tr_2"
                        style={{ padding: "5px 0px" }}>
                        <Col
                          xl={3}
                          lg={3}
                          md={6}
                          sm={12}
                          className="Application-td__name">
                          <Link to={`entreprise/${entreprise.num}`}>
                            <Image
                              className="Application-photo"
                              name={entreprise.profile_pic_url}
                            />
                            {entreprise.name}
                          </Link>
                        </Col>
                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          className="Application-td">
                          {entreprise.name_of_in_charge}
                        </Col>
                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          className="Application-td__name">
                          {moment(entreprise.createdAt).format("DD/MM/YYYY")}
                        </Col>
                        <Col
                          xl={1}
                          lg={1}
                          md={6}
                          sm={12}
                          className="Application-td">
                          <div
                            title="Voir"
                            style={{ cursor: "pointer", marginRight: 20 }}>
                            <Link to={`/entreprise/${entreprise.num}`}>
                              <Icon
                                className="OfferItem__see-offer"
                                name="see-offer"
                              />
                            </Link>
                          </div>
                          <div
                            title="Modifier"
                            style={{ cursor: "pointer", zIndex: 99999990 }}>
                            <Link
                              to={{
                                pathname: `/entreprise/${entreprise.num}`,
                                state: {
                                  update: true,
                                },
                              }}>
                              <Icon
                                className="OfferItem__edit-offer"
                                name="edit-offer"
                              />
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                <div style={{ textAlign: "center" }}>
                  <Pagination
                    prevPageText="Précédente"
                    nextPageText="Suivante"
                    firstPageText="Première"
                    lastPageText="Dernière"
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    innerClass={"pagination"}
                    totalItemsCount={
                      getEntreprises ? getEntreprises.totalCount : 0
                    }
                    pageRangeDisplayed={limit}
                    onChange={this.handlePageChange}
                  />
                </div>
              </Panel>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
export default compose(graphql(EXPORT_ECOLE, { name: "exportEcole" }))(
  SchoolsList
);
