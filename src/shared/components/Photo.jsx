import React from "react";
import PropTypes from "prop-types";

class Photo extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    profile_pic: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: "",
    containerClassName: ""
  };

  render() {
    const {
      className,
      containerClassName,
      profile_pic: { profile_pic_url, name }
    } = this.props;
    return profile_pic_url ? (
      <img
        className={`user-details__photo ${className}`}
        src={profile_pic_url}
        alt={`${name}`}
      />
    ) : (
      <div
        className={`user-details__photo-container ${containerClassName}`.trim()}
      >
        <div className="user-details__profile">
          {`${`${name.charAt(0)}`}`.toUpperCase()}
        </div>
      </div>
    );
  }
}

export default Photo;
