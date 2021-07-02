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
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import * as moment from "moment";
import { GET_APPLICATIONS_BY_WEEK_STATS } from "../../../handler/queries";

class SimpleLineChart extends React.PureComponent {
  static propTypes = {
    getAcceptedApplicationsStatByWeek: PropTypes.array,
    refetch: PropTypes.func
  };

  static defaultProps = {
    getAcceptedApplicationsStatByWeek: []
  };
  render() {
    const data = [
      {
        name: moment()
          .add(-6, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[6]
      },
      {
        name: moment()
          .add(-5, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[5]
      },
      {
        name: moment()
          .add(-4, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[4]
      },

      {
        name: moment()
          .add(-3, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[3]
      },
      {
        name: moment()
          .add(-2, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[2]
      },
      {
        name: moment()
          .add(-1, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[1]
      },
      {
        name: moment().format("DD/MM/YYYY"),
        nombre: this.props.getAcceptedApplicationsStatByWeek[0]
      }
    ];

    return (
      <Panel
        xl={6}
        lg={6}
        md={12}
        title="Nombre de candidatures retenues"
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
export default graphql(GET_APPLICATIONS_BY_WEEK_STATS, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data: { getAcceptedApplicationsStatByWeek, refetch } }) => ({
    getAcceptedApplicationsStatByWeek,
    refetch
  })
})(SimpleLineChart);
