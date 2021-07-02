import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import Icon from "../../../shared/components/Icon";

const SidebarLink = ({ active, newLink, route, onClick }) => (
  <NavLink
    to={route.to}
    onClick={onClick}
    activeClassName="sidebar__link-active"
  >
    <li
      className={`sidebar__link ${
        active ? "sidebar__link--active" : ""
      }`.trim()}
    >
      <Icon className="side-bar__icon" name={route.icon} />
      <p className="sidebar__link-title">
        {route.label}
        {newLink ? (
          <Badge className="sidebar__link-badge">
            <span>New</span>
          </Badge>
        ) : (
          ""
        )}
      </p>
    </li>
  </NavLink>
);

SidebarLink.propTypes = {
  newLink: PropTypes.bool,
  active: PropTypes.bool,
  route: PropTypes.object,
  onClick: PropTypes.func
};

SidebarLink.defaultProps = {
  newLink: false,
  active: false,
  route: {},
  onClick: () => {}
};

export default SidebarLink;
