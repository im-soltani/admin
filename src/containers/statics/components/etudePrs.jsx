/* eslint-disable react/prop-types */
import "moment/locale/es-us";
import PropTypes from "prop-types";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Panel from "../../../shared/components/Panel";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#ff4861",
  "#c88ffa",
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
class EtudePrs extends React.PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/hqnrgxpj/";
  static propTypes = {
    data: PropTypes.array,
    refetch: PropTypes.func,
  };
  static defaultProps = {
    getSharedCVStat: [],
  };
  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  render() {
    const { refetch } = this.props;
    const data = [
      { name: "BAC+1", value: this.props.data[9] },
      { name: "BAC+2", value: this.props.data[10] },
      { name: "BAC+3", value: this.props.data[11] },
      { name: "BAC+4", value: this.props.data[12] },
      { name: "BAC+5", value: this.props.data[13] },
      { name: "> BAC+5", value: this.props.data[14] },
    ];
    return (
      <Panel
        xl={6}
        lg={6}
        md={12}
        title="Niveau d'étude des candidats en %"
        refetch={refetch}>
        <ResponsiveContainer height={400} className="dashboard__area">
          <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx={300}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}>
              <label dataKey="name" position="central" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Panel>
    );
  }
}
export default EtudePrs;
