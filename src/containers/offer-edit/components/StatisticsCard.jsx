import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { Pie, Bar } from "react-chartjs-2";
import * as moment from "moment";

class StatisticsCard extends React.PureComponent {
  static propTypes = {
    applications: PropTypes.array
  };

  static defaultProps = {
    applications: []
  };

  render() {
    const { applications } = this.props;
    const PieData = {
      labels: [
        "Non traitée",
        "Retenue",
        "Refusée",
        "Annulée par le candidat"
      ],
      datasets: [
        {
          data: [
            applications.filter(app => app.state === "PENDING").length,
            applications.filter(app => app.state === "ACCEPTED").length,
            applications.filter(app => app.state === "REFUSED").length,
            applications.filter(app => app.state === "CANCELED").length
          ],
          backgroundColor: [
            "#36A2EB",
            "#5de66a",
            "#27498c",
            "#4c8a37"
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#5de66a",
            "#27498c",
            "#4c8a37"
          ]
        }
      ]
    };
    const BarData = {
      labels: ["Avant-hier", "Hier", "Aujourd'hui"],
      datasets: [
        {
          label: "Nombre des candidatures",
          backgroundColor: "rgba(35, 84, 181,0.6)",
          borderColor: "rgba(35, 84, 181,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(35, 84, 181,0.8)",
          hoverBorderColor: "rgba(35, 84, 181,1)",
          data: [
            applications.filter(app =>
              moment(app.createdAt).isSame(moment().subtract(2, "day"), "day")
            ).length,
            applications.filter(app =>
              moment(app.createdAt).isSame(moment().subtract(1, "day"), "day")
            ).length,
            applications.filter(app =>
              moment(app.createdAt).isSame(moment(), "day")
            ).length
          ]
        }
      ]
    };
    return (
      <Row style={{ width: "100%", marginTop: "5rem" }}>
        <Col xs={12} md={12} lg={8} xl={8}>
          <Pie data={PieData} />
        </Col>
        <Col xs={12} md={12} lg={4} xl={4}>
          <Bar
            data={BarData}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default StatisticsCard;
