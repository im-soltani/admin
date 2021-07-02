import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Container } from "reactstrap";
import { graphql } from "react-apollo";
import GraphQlResult from "../../shared/components/GraphQLResult";
import SchoolInfo from "./components/SchoolInfo";
import SchoolInfoUpdate from "./components/SchoolInfoUpdate";
import SchoolAdd from "./components/SchoolAdd";
import { withRouter } from "react-router-dom";

class EcoleDetails extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    location: PropTypes.object,
    refetch: PropTypes.func,
    error: PropTypes.object,
    getEntrepriseByNum: PropTypes.object
  };

  static defaultProps = {
    loading: false,
    error: null,
    getEntrepriseByNum: null
  };
  constructor(props) {
    super(props);
    this.state = {
      update:
        props.location && props.location.state && props.location.state.update
    };
  }

  handleChangeUpdate = () => {
    this.setState({ update: !this.state.update });
    this.props.refetch();
  };

  render() {
    const { loading, error, getEntrepriseByNum, refetch } = this.props;
    return (
      <Container className="dashboard">
        <GraphQlResult
          error={error}
          emptyResult={!loading && !getEntrepriseByNum}>
          {getEntrepriseByNum && !this.state.update && (
            <SchoolInfo
              user={getEntrepriseByNum}
              handleChangeUpdate={this.handleChangeUpdate}
              loading={loading}
              refetch={refetch}
            />
          )}
          {getEntrepriseByNum && this.state.update && (
            <SchoolInfoUpdate
              user={getEntrepriseByNum}
              handleChangeUpdate={this.handleChangeUpdate}
              loading={loading}
            />
          )}
        </GraphQlResult>
        {!getEntrepriseByNum && <SchoolAdd loading={loading} />}
      </Container>
    );
  }
}

const GET_ENTRPRISE_BY_NUM = gql`
  query getEntrepriseByNum($num: Int!) {
    getEntrepriseByNum(num: $num) {
      id
      num
      name
      profile_pic_url
      profile {
        id
        email
        is_blocked
        is_blocked_by_admin
      }
      tel
      application_email
      name_of_in_charge
      users {
        id
        email
        is_holder
      }
      banner
      description
      effective
      website
      activity
      zip_code
      country
      city
      address
      address_2
      zip_code_2
      country_2
      city_2
      youtubeLink
      linkedinLink
    }
  }
`;

export default withRouter(
  graphql(GET_ENTRPRISE_BY_NUM, {
    options: props => ({
      fetchPolicy: "cache-and-network",
      variables: { num: props.match.params.num }
    }),
    props: ({ data: { loading, error, getEntrepriseByNum, refetch } }) => ({
      loading,
      error,
      getEntrepriseByNum,
      refetch
    })
  })(EcoleDetails)
);
