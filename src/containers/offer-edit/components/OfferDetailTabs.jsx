import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import OfferApplications from "./OfferApplications";
import Select from "../../../shared/components/Select";
import { sortApplicationsConst } from "../../../handler/utils/constants";
import StatisticsCard from "./StatisticsCard";
import OfferForm from "../../add-offer/components/OfferForm";

class OfferDetailTabs extends React.Component {
  static propTypes = {
    offer: PropTypes.object,
    refetch: PropTypes.func,
    activeTab: PropTypes.string
  };

  static defaultProps = {
    offer: {},
    activeTab: "1"
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.activeTab,
      offer: props.offer ? props.offer : {},
      sort: "recent"
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.offer !== this.props.offer)
      this.setState({ offer: nextProps.offer });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onSelect = (value, name) => {
    this.setState({ [name]: value });
  };
  handleChangeUpdate = () => {
    this.toggle("1");
  };

  render() {
    return (
      <div>
        <Nav tabs style={{ marginTop: "2em", marginBottom: "2em" }}>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === "1"
                  ? "OfferDetailTabs-navlink-active"
                  : "OfferDetailTabs-navlink"
              }
              onClick={() => {
                this.toggle("1");
              }}
            >
              CANDIDATURES
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === "2"
                  ? "OfferDetailTabs-navlink-active"
                  : "OfferDetailTabs-navlink"
              }
              onClick={() => {
                this.toggle("2");
              }}
              style={{ textTransform: "uppercase" }}
            >
              détails
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                this.state.activeTab === "3"
                  ? "OfferDetailTabs-navlink-active"
                  : "OfferDetailTabs-navlink"
              }
              onClick={() => {
                this.toggle("3");
              }}
            >
              STATISTIQUES
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div>
              <Row style={{ marginBottom: "2em" }}>
                <Col xs={4} md={2} lg={2} xl={2}>
                  <Label
                    check
                    className="OfferDetailTabs-label__select"
                    style={{
                      marginRight: "1em",
                      lineHeight: "2em",
                      textTransform: "uppercase"
                    }}
                  >
                    trier par
                  </Label>
                </Col>
                <Col xs={8} md={4} lg={3} xl={3}>
                  <Select
                    className="Profil-group__input"
                    onSelect={this.onSelect}
                    name={"sort"}
                    items={sortApplicationsConst}
                  />
                </Col>
              </Row>
              <Row>
                <OfferApplications
                  refetch={this.props.refetch}
                  offer={this.state.offer}
                  sort={this.state.sort}
                />
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <OfferForm
              offer={this.state.offer}
              refetch={this.props.refetch}
              type={"update"}
              handleChangeForm={this.handleChangeUpdate}
            />
          </TabPane>
          <TabPane tabId="3">
            <StatisticsCard applications={this.state.offer.applications} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
export default OfferDetailTabs;
