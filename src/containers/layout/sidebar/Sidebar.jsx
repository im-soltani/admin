import React from "react";
import Scrollbar from "react-smooth-scrollbar";
import classNames from "classnames";
import PropTypes from "prop-types";
import SidebarContent from "./SidebarContent";

const Sidebar = ({
  changeMobileSidebarVisibility,
  sidebarShow,
  changeSidebarVisibility,
  sidebarCollapse
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    "sidebar--show": sidebarShow,
    "sidebar--collapse": sidebarCollapse
  });

  return (
    <div className={sidebarClass}>
      <button
        className="sidebar__back"
        onClick={changeMobileSidebarVisibility}
      />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent
            sidebarCollapse={sidebarCollapse}
            changeSidebarVisibility={changeSidebarVisibility}
            onClick={() => {}}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            changeSidebarVisibility={changeSidebarVisibility}
            sidebarCollapse={sidebarCollapse}
            onClick={changeMobileSidebarVisibility}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarShow: PropTypes.bool.isRequired,
  sidebarCollapse: PropTypes.bool.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired
};

export default Sidebar;
