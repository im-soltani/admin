import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";

class Layout extends Component {
  state = {
    sidebarShow: false,
    sidebarCollapse: true
  };

  changeSidebarVisibility = () => {
    this.setState({ sidebarCollapse: !this.state.sidebarCollapse });
  };

  changeMobileSidebarVisibility = () => {
    this.setState({ sidebarShow: !this.state.sidebarShow });
  };

  render() {
    const { sidebarShow, sidebarCollapse } = this.state;
    const layoutClass = classNames({
      layout: true,
      "layout--collapse": sidebarCollapse
    });

    return (
      <div className={layoutClass}>
        <Topbar
          sidebarCollapse={sidebarCollapse}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
        />
        <Sidebar
          sidebarShow={sidebarShow}
          sidebarCollapse={sidebarCollapse}
          changeSidebarVisibility={this.changeSidebarVisibility}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

export default withRouter(Layout);
