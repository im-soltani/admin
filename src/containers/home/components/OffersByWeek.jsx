import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Panel from "../../../shared/components/Panel";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import * as moment from "moment";
import { GET_OFFERS_BY_WEEK_STATS } from "../../../handler/queries";

class OffersByWeek extends React.PureComponent {
  static propTypes = {
    getOffersStatByWeek: PropTypes.array,
    refetch: PropTypes.func
  };

  static defaultProps = {
    getOffersStatByWeek: []
  };
  render() {
    const data = [
      {
        name: moment()
          .add(-6, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[6]
      },
      {
        name: moment()
          .add(-5, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[5]
      },
      {
        name: moment()
          .add(-4, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[4]
      },

      {
        name: moment()
          .add(-3, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[3]
      },
      {
        name: moment()
          .add(-2, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[2]
      },
      {
        name: moment()
          .add(-1, "days")
          .format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[1]
      },
      {
        name: moment().format("DD/MM/YYYY"),
        nombre: this.props.getOffersStatByWeek[0]
      }
    ];

    return (
      <Panel
        xl={6}
        lg={6}
        md={12}
        title="Offres quotidiennes"
        refetch={this.props.refetch}
      >
        <ResponsiveContainer height={300} className="dashboard__area">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -15,
              bottom: 0
            }}
          >
            <XAxis dataKey="name" tickLine={false} />
            <YAxis tickLine={false} />
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="nombre"
              stroke="#295ebe"
              fill="#e4b31d"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>
    );
  }
}
export default graphql(GET_OFFERS_BY_WEEK_STATS, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data: { getOffersStatByWeek, refetch } }) => ({
    getOffersStatByWeek,
    refetch
  })
})(OffersByWeek);
