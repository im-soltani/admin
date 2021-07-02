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
import Description from "./Description";
class ActualitéDescription extends PureComponent {
  static propTypes = {
    actualité: PropTypes.object.isRequired,
    fromApp: PropTypes.bool
  };
  static defaultProps = {
    fromApp: false
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
    const { actualité, fromApp } = this.props;
    return (
      <Col md={12} lg={fromApp ? 12 : 7} xl={fromApp ? 12 : 8}>
        <Card style={fromApp ? { "box-shadow": "2px 2px 10px #e6e6e6" } : {}}>
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
                    }}>
                    Description
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Description description={actualité.description} />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
}
export default ActualitéDescription;
