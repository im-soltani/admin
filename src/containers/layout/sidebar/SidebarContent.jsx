import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import Logo from "../../../shared/components/Logo";
import Icon from "../../../shared/components/Icon";

const routes = [
  {
    label: "Accueil",
    to: "/accueil",
    icon: "home",
  },
  {
    label: "Entreprises",
    to: "/entreprises",
    icon: "entreprises",
  },

  {
    label: "Offres",
    to: "/offres",
    icon: "offers-icon",
  },
  {
    label: "Candidats",
    to: "/candidats",
    icon: "candidats",
  },
  {
    label: "Statistiques",
    to: "/statistique",
    icon: "stats",
  },
  {
    label: "Compétences",
    to: "/competences",
    icon: "menu-competences",
  },
  {
    label: "Métiers",
    to: "/metiers",
    icon: "menu-jobs",
  },
  {
    label: "Softskills",
    to: "/softskills",
    icon: "menu-softskills",
  },
  {
    label: "Paramètres",
    to: "/parametres",
    icon: "settings",
  },
  {
    label: "ADMINISTRATEURS",
    to: "/administrateurs",
    icon: "admins",
  },
];

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    sidebarCollapse: PropTypes.bool.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapse: props.sidebarCollapse,
    };
  }

  isActive = ({ to }) => {
    let { pathname } = this.props.location;
    if (pathname === "/") pathname = "/accueil";
    return pathname.indexOf(to) !== -1;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarCollapse !== this.props.sidebarCollapse)
      this.setState({ sidebarCollapse: nextProps.sidebarCollapse });
  }
  _renderRoute = ({ index, route }) => (
    <SidebarLink
      key={index.toString()}
      route={route}
      active={this.isActive(route)}
      onClick={this.hideSidebar}
    />
  );

  render() {
    return (
      <div className="sidebar__content">
        <div className="text-center" style={{ marginBottom: "1rem" }}>
          {!this.state.sidebarCollapse && <Logo />}
          <div
            onClick={this.props.changeSidebarVisibility}
            style={{ cursor: "pointer", marginTop: 20 }}>
            <Icon className="sidebar__menu-icon" name="menu-button" />
          </div>
        </div>
        <ul className="sidebar__block">
          {routes.map((route, index) => this._renderRoute({ route, index }))}
        </ul>
        {/*      <ul className="sidebar__block">
          <SidebarLink
            title="Log In"
            icon="exit"
            route="/log_in"
            active={this.isActive(route)}
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Log In"
            icon="exit"
            route="/log_in"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Log In"
            icon="exit"
            route="/log_in"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Log In"
            icon="exit"
            route="/log_in"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Log In"
            icon="exit"
            route="/log_in"
            onClick={this.hideSidebar}
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Example Pages" icon="diamond">
            <SidebarLink
              title="Page one"
              route="/pages/one"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Page two"
              route="/pages/two"
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
        </ul> */}
      </div>
    );
  }
}

export default withRouter(SidebarContent);
