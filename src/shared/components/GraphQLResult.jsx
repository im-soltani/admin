import PropTypes from "prop-types";
import React, { Component } from "react";
import { BounceLoader } from "react-spinners";
import { Spinner } from "reactstrap";
import { graphql } from "react-apollo";

import { SET_TOKEN } from "../../handler/mutations.local";

class GraphQLResult extends Component {
  static propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    children: PropTypes.any,
    error: PropTypes.object,
    loading: PropTypes.bool,
    clipLoader: PropTypes.bool,
    loadingColor: PropTypes.string,
    renderError: PropTypes.func,
    setToken: PropTypes.func.isRequired,
    clipLoaderSize: PropTypes.string,
    emptyResult: PropTypes.bool,
    emptyResultMsg: PropTypes.string
  };

  static defaultProps = {
    className: "graphql-result",
    containerClassName: "",
    clipLoader: true,
    clipLoaderSize: "md",
    loadingColor: "warning",
    renderError: null,
    emptyResult: false,
    emptyResultMsg: "Aucun élément n'a été trouvé !",
    children: null
  };

  _renderLoader = () => {
    const {
      clipLoader,
      loadingColor,
      containerClassName,
      clipLoaderSize
    } = this.props;
    return (
      <div className={`graphql-result__container ${containerClassName}`.trim()}>
        {clipLoader ? (
          <Spinner size={clipLoaderSize} color={loadingColor} />
        ) : (
          <BounceLoader color={loadingColor} size={35} />
        )}
      </div>
    );
  };

  _renderError = () => {
    const { error, renderError } = this.props;
    if (error.networkError && error.networkError.statusCode === 401) {
      this.props.setToken();
    } else if (error.graphQLErrors && error.graphQLErrors[0]) {
      const errorMsg = error.graphQLErrors[0].message;
      if (renderError) return renderError(errorMsg);
    }
  };

  render() {
    const {
      loading,
      children,
      error,
      className,
      containerClassName,
      emptyResult,
      emptyResultMsg
    } = this.props;
    return (
      <div className={className}>
        {loading ? (
          this._renderLoader()
        ) : error ? (
          this._renderError()
        ) : emptyResult ? (
          <div className={`${containerClassName} p-sm-5 text-info text-center`}>
            {emptyResultMsg}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
}

export default graphql(SET_TOKEN, {
  name: "setToken"
})(GraphQLResult);
