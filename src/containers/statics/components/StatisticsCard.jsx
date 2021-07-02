/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import Icon from "../../../shared/components/Icon";

class StatisticsCard extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.string,
    labelClassName: PropTypes.string,
    iconContainerClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    valueClassName: PropTypes.string
  };

  static defaultProps = {
    labelClassName: "",
    iconClassName: "",
    valueClassName: ""
  };

  render() {
    const {
      label,
      value,
      icon,
      iconContainerClassName,
      iconClassName,
      labelClassName,
      valueClassName
    } = this.props;
    return (
      <Col md={6} xl={3} lg={3} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div
              className={`statistics-card__icon-container icon-container ${iconContainerClassName}`.trim()}
            >
              <Icon
                name={icon}
                className={`statistics-card__icon ${iconClassName}`.trim()}
              />
            </div>
            <div className="statistics-card__container">
              <div
                className={`statistics-card__value ${valueClassName}`.trim()}
              >
                {value}
              </div>
              <div
                className={`statistics-card__label ${labelClassName}`.trim()}
              >
                {label}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default StatisticsCard;