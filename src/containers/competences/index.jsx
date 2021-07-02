import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Input } from "reactstrap";
import Pagination from "react-js-pagination";
import { graphql, compose,Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_COMPETENCES } from "../../handler/queries";
import FlotLabelWithActions from "../../shared/components/FlotLabelWithActions";
import ItemActions from "../../shared/components/ItemActions";

class CompetencesList extends React.PureComponent {
  static propTypes = {
    getCompetences: PropTypes.array,
    addCompetence: PropTypes.func,
    updateCompetence: PropTypes.func,
    removeCompetence: PropTypes.func,
    exportCompetence: PropTypes.func
  };

  static defaultProps = {
    getCompetences: []
  };

  state = {
    activePage: 1,
    search: "",
    skip: 0,
    update: false,
    limit: 50,
    item: {}
  };

  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * this.state.limit
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
          query={GET_COMPETENCES}
          variables={{
            search: search,
            skip: (activePage - 1) * limit,
            limit: limit
          }}
        >
          {({ data: { getCompetences }, loading, error, refetch }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;

            return (
              <Container className="Items-container">
                <Row
                  className="Items-row__content"
                  style={{ marginBottom: 30 }}
                >
                  <Col xl={3} lg={3} md={5} sm={12} className="Items-col__left">
                    <ItemActions
                      item={item}
                      addItems={this.props.addCompetence}
                      exportFunc={this.props.exportCompetence}
                      refetch={refetch}
                      getItem={this.getItem}
                      update={update}
                      updateItem={this.props.updateCompetence}
                      label={"compétence"}
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
                      items={getCompetences.competences}
                      removeItem={this.props.removeCompetence}
                      getItem={this.getItem}
                      enableDelete={true}
                      refetch={refetch}
                      label={"compétences"}
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
                    totalItemsCount={
                      getCompetences && getCompetences.totalCount ? getCompetences.totalCount : 0
                    }
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
const ADD_COMPETENCES = gql`
  mutation addCompetence($data: [CompetenceInput]) {
    addCompetence(data: $data) {
      id
      name
    }
  }
`;
const UPDATE_COMPETENCE = gql`
  mutation updateCompetence($id: ID!, $name: String!) {
    updateCompetence(id: $id, name: $name) {
      id
      name
    }
  }
`;
const REMOVE_COMPETENCE = gql`
  mutation removeCompetence($id: ID!) {
    removeCompetence(id: $id)
  }
`;
const EXPORT_COMPETENCE = gql`
  mutation exportCompetence {
    exportCompetence
  }
`;
export default compose(
  graphql(ADD_COMPETENCES, { name: "addCompetence" }),
  graphql(UPDATE_COMPETENCE, { name: "updateCompetence" }),
  graphql(REMOVE_COMPETENCE, { name: "removeCompetence" }),
  graphql(EXPORT_COMPETENCE, { name: "exportCompetence" }),
)(CompetencesList);
