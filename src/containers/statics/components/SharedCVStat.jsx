import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Panel from "../../../shared/components/Panel";

import "moment/locale/es-us";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { SHARED_CV_STAT } from "../../../handler/queries";

class SharedCVStat extends React.PureComponent {
  static propTypes = {
    getSharedCVStat: PropTypes.array,
    refetch: PropTypes.func
  };

  static defaultProps = {
    getSharedCVStat: []
  };
  render() {
    const data = this.props.getSharedCVStat;
    return (
      <Panel
        xl={12}
        lg={12}
        md={12}
        title="Nombre de CV partagés par les adhérents"
        refetch={this.props.refetch}
      >
        <ResponsiveContainer height={300} className="dashboard__area">
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap={30}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />

            <Bar dataKey="nombre" fill="#759ef2" />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    );
  }
}
export default graphql(SHARED_CV_STAT, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data: { getSharedCVStat, refetch } }) => ({
    getSharedCVStat,
    refetch
  })
})(SharedCVStat);
