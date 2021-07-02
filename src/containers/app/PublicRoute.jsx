import React from "react";
import PropTypes from "prop-types";

import { setDocumentTitle } from "../utils/functions";

class PublicRoute extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired
  };

  componentDidMount() {
    setDocumentTitle(this.props.title);
  }

  render() {
    return <div className="public-container">{this.props.children}</div>;
  }
}

export default PublicRoute;
