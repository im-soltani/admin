import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string,
    button: PropTypes.bool,
    callback: PropTypes.func
  };

  render() {
    const { title, icon, path, callback, button } = this.props;

    return button ? (
      <div className="topbar__link" onClick={callback}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </div>
    ) : (
      <Link className="topbar__link" to={path}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </Link>
    );
  }
}
