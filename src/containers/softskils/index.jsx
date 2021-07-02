import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Input } from "reactstrap";
import Pagination from "react-js-pagination";
import { graphql, compose, Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_SOFTSKILLS } from "../../handler/queries";
import FlotLabelWithActions from "../../shared/components/FlotLabelWithActions";
import ItemActionSoftskill from "../../shared/components/ItemActionSoftskill";

class Softskills extends React.PureComponent {
  static propTypes = {
    getSoftskills: PropTypes.array,
    addSoftskill: PropTypes.func,
    updateSoftskill: PropTypes.func,
    removeSoftskill: PropTypes.func,
    exportSoftskill: PropTypes.func
  };

  static defaultProps = {
    getSoftskills: []
  };

  state = {
    activePage: 1,
    search: "",
    skip: 0,
    limit: 50,
    item: {}
  };

  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * 2
    });
  };

  getItem = (item, update) => this.setState({ item, update });

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { search, limit, activePage, item, update } = this.state;
    return (
      <div className="Items">
        <Row className="Items-row__header">
          <Input
            className="Profil-group__input"
            onChange={this.onChange}
            type="text"
            value={this.state.search}
            name="search"
            placeholder="Rechercher"
          />
        </Row>
        <Query
          query={GET_SOFTSKILLS}
          variables={{
            search: search,
            skip: (activePage - 1) * limit,
            limit: limit
          }}
        >
          {({ data: { getSoftskills }, loading, error, refetch }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;

            return (
              <Container className="Items-container">
                <Row
                  className="Items-row__content"
                  style={{ marginBottom: 30 }}
                >
                  <Col xl={3} lg={3} md={5} sm={12} className="Items-col__left">
                    <ItemActionSoftskill
                      item={item}
                      addItems={this.props.addSoftskill}
                      exportFunc={this.props.exportSoftskill}
                      refetch={refetch}
                      getItem={this.getItem}
                      update={update}
                      updateItem={this.props.updateSoftskill}
                      label={"softskills"}
                    />
                  </Col>

                  <Col
                    xl={8}
                    lg={8}
                    md={6}
                    sm={12}
                    className="Items-col__right"
                  >
                    <FlotLabelWithActions
                      items={getSoftskills.softskills}
                      removeItem={this.props.removeSoftskill}
                      getItem={this.getItem}
                      enableDelete={true}
                      refetch={refetch}
                      label={"Softskills"}
                      className="sticky-labes"
                    />
                  </Col>
                </Row>

                <div style={{ textAlign: "center" }}>
                  <Pagination
                    prevPageText="Précédente"
                    nextPageText="Suivante"
                    firstPageText="Première"
                    lastPageText="Dernière"
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    innerClass={"pagination"}
                    totalItemsCount={getSoftskills ? getSoftskills.totalCount : 0}
                    pageRangeDisplayed={limit}
                    onChange={this.handlePageChange}
                  />
                </div>
              </Container>
            );
          }}
        </Query>
      </div>
    );
  }
}
const ADD_SOFTSKILL = gql`
  mutation addSoftskill($data: [SoftskillInput]) {
    addSoftskill(data: $data) {
      id
      name
    }
  }
`;
const UPDATE_SOFTSKILL = gql`
  mutation updateSoftskill($id: ID!, $name: String!) {
    updateSoftskill(id: $id, name: $name) {
      id
      name
    }
  }
`;
const REMOVE_SOFTSKILL = gql`
  mutation removeSoftskill($id: ID!) {
    removeSoftskill(id: $id)
  }
`;
const EXPORT_SOFTSKILL = gql`
  mutation exportSoftskill {
    exportSoftskill
  }
`;
export default compose(
  graphql(ADD_SOFTSKILL, { name: "addSoftskill" }),
  graphql(UPDATE_SOFTSKILL, { name: "updateSoftskill" }),
  graphql(REMOVE_SOFTSKILL, { name: "removeSoftskill" }),
  graphql(EXPORT_SOFTSKILL, { name: "exportSoftskill" }),
)(Softskills);
