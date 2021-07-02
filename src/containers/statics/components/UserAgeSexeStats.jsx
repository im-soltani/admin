import React from "react";
/*import {
  /*BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Panel from "../../../shared/components/Panel";*/

import { Row } from "reactstrap";
import "moment/locale/es-us";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { GET_USERS_AGE_SEXE_STATS } from "../../../handler/queries";
import AgeChart from "./AgeChart";
import EtudePrs from "./etudePrs";
import SexeChart from "./SexeChart";
class UserAgeSexeStats extends React.PureComponent {
  static propTypes = {
    getUserAgeSexeStats: PropTypes.array,
    refetch: PropTypes.func,
  };

  static defaultProps = {
    getUserAgeSexeStats: [],
  };
  render() {
    const data = this.props.getUserAgeSexeStats;
    return (
      <Row>
        <SexeChart data={data} refetch={this.props.refetch} />
        <AgeChart data={data} refetch={this.props.refetch} />
        <EtudePrs data={data} refetch={this.props.refetch} />
      </Row>
    );
  }
}
export default graphql(GET_USERS_AGE_SEXE_STATS, {
  options: () => ({
    fetchPolicy: "cache-and-network",
  }),
  props: ({ data: { getUserAgeSexeStats, refetch } }) => ({
    getUserAgeSexeStats,
    refetch,
  }),
})(UserAgeSexeStats);
