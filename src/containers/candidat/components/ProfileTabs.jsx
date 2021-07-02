import React, { PureComponent } from "react";
import {
  Card,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import ProfilLetter from "./ProfilLetter";
import ProfilCV from "./ProfilCV";

export default class ProfileTabs extends PureComponent {
  static propTypes = {
    candidat: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { candidat } = this.props;
    return (
      <Col md={12} lg={7} xl={8}>
        <Card>
          <div className="profile__card tabs tabs--bordered-bottom">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    CV Français
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    CV Anglais
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    Lettre de motivation
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <ProfilCV
                    file={candidat.cv}
                    name={candidat.first_name + "-" + candidat.last_name}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <ProfilCV
                    file={candidat.cv_eng}
                    name={candidat.first_name + "-" + candidat.last_name}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <ProfilLetter letter={candidat.letter} />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
}
