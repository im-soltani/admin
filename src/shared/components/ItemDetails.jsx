import React from "react";
import { ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";

class ItemDetails extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    array: PropTypes.bool,
    children: PropTypes.any
  };

  static defaultProps = {
    className: "",
    array: false,
    children: null
  };

  render() {
    const { className, label, children, value, array } = this.props;
    return (
      <ListGroupItem
        tag="div"
        className={`Profil-group__item ${className}`.trim()}
      >
        <div className="Profil-group__label">{label}</div>
        {children ? (
          <div className="Profil-group__value">{children}</div>
        ) : (
          <span className="Profil-group__value">
            {array ? value.join(", ") : value}
          </span>
        )}
      </ListGroupItem>
    );
  }
}

export default ItemDetails;
