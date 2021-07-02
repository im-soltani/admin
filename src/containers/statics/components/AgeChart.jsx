import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Panel from "../../../shared/components/Panel";

import "moment/locale/es-us";
import PropTypes from "prop-types";

class AgeChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    refetch: PropTypes.func,
  };

  static defaultProps = {
    getSharedCVStat: [],
  };
  render() {
    const { data, refetch } = this.props;
    const stats = [
      { name: "18-24", nombre: data[3] },
      { name: "25-29", nombre: data[4] },
      { name: "30-34", nombre: data[5] },
      { name: "35-39", nombre: data[6] },
      { name: "+40", nombre: data[7] },
      { name: "Inconnu", nombre: data[8] },
    ];
    return (
      <Panel
        xl={6}
        lg={6}
        md={12}
        title="Répartition des candidats par âge"
        refetch={refetch}>
        <ResponsiveContainer height={300} className="dashboard__area">
          <BarChart
            width={600}
            height={300}
            data={stats}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap={30}>
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
export default AgeChart;
