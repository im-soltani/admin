import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Pagination from "react-js-pagination";
import Panel from "../../shared/components/Panel";
import { GET_ADMINS } from "../../handler/queries";

class AdminsList extends React.PureComponent {
  static propTypes = {
    getAdmins: PropTypes.array,
    refetch: PropTypes.func
  };

  static defaultProps = {
    getAdmins: []
  };

  state = {
    activePage: 1,
    search: "",
    skip: 0,
    limit: 8
  };

  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * 2
    });
  };

  render() {
    const { limit, activePage } = this.state;
    return (
      <React.Fragment>
        <Row className="Add-row">
          <Col xl={8} lg={8} md={8} sm={12} />
          <Col xl={4} lg={4} md={6} sm={12}>
            <Link className="Link-add" to="/ajouter-admin">
              Ajouter un nouvel admin
            </Link>
          </Col>
        </Row>
        <Query
          query={GET_ADMINS}
          variables={{
            skip: (activePage - 1) * limit,
            limit: limit
          }}
        >
          {({ data: { getAdmins }, loading, error, refetch }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;

            return (
              <Panel
                xl={12}
                lg={12}
                md={12}
                title="Liste des administrateurs"
                refetch={refetch}
              >
                <Row className="Application" style={{ padding: 30 }}>
                  <Col xl={4} lg={4} md={6} sm={12} className="Application-th">
                    Nom complet
                  </Col>
                  <Col xl={4} lg={4} md={6} sm={12} className="Application-th">
                    Email
                  </Col>

                  <Col xl={4} lg={4} md={6} sm={12} className="Application-th">
                    Date d'ajout
                  </Col>
                </Row>
                {getAdmins &&
                  getAdmins.admins &&
                  getAdmins.admins.map(admin => {
                    return (
                      <Row
                        key={admin.id}
                        className="Application-tr_2"
                        style={{ padding: "5px 0px" }}
                      >
                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          className="Application-td__name"
                        >
                          {admin.profile_pic_url &&
                          admin.profile_pic_url !== "undefined" ? (
                            <img
                              className="Application-photo"
                              src={admin.profile_pic_url}
                              alt={`${admin.last_name}`}
                            />
                          ) : (
                            <div className={"Application-letters-div"}>
                              <div className="Application-letters">
                                {`${`${admin.first_name.charAt(
                                  0
                                )}${admin.last_name.charAt(0)}`}`.toUpperCase()}
                              </div>
                            </div>
                          )}

                          <Link to={`/admin/${admin.num}`}>
                            {admin.first_name + " " + admin.last_name}
                          </Link>
                        </Col>
                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          className="Application-td"
                        >
                          {admin.profile.email}
                        </Col>

                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          className="Application-td__name"
                        >
                          {moment(admin.createdAt).format("DD/MM/YYYY")}
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
                    totalItemsCount={getAdmins ? getAdmins.totalCount : 0}
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

export default AdminsList;
