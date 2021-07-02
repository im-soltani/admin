import React from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import SearchIcon from "mdi-react/SearchIcon";
import { sortOffersConst } from "../../../handler/utils/constants";
import Select from "../../../shared/components/Select";

class HeaderListesOffers extends React.Component {
  static propTypes = {
    getStatus: PropTypes.func,
    onChangeSearch: PropTypes.func,
    getSort: PropTypes.func,
    status: PropTypes.string,
    field: PropTypes.string,
    direction: PropTypes.number,
    search: PropTypes.string
  };

  static defaultProps = {
    status: "DRAFT",
    field: "name",
    direction: 1,
    search: ""
  };
  constructor(props) {
    super(props);

    this.state = {
      status: props.status ? props.status : "DRAFT",
      field: props.field ? props.field : "name",
      direction: props.direction ? props.direction : 1,
      search: props.search ? props.search : ""
    };
  }

  onChange = e => {
    if (e.target) this.props.getStatus(e.target.id);
  };
  onChangeSearch = e => {
    this.setState({ search: e.target.value });
    this.props.onChangeSearch(e.target.value);
  };
  onSelect = (value, name) => {
    this.setState({ [name]: value });
    let array = value.split(";");
    this.props.getSort(array[0], parseInt(array[1]));
  };

  render() {
    return (
      <div>
        <FormGroup tag="fieldset">
          <Row className="ListeOfferHeader-row">
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="DRAFT"
                defaultChecked={this.state.status === "DRAFT"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                BROUILLONS
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="ACTIF"
                defaultChecked={this.state.status === "ACTIF"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                validées
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="PUBLISHED"
                defaultChecked={this.state.status === "PUBLISHED"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                publiées
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="ON_HOLD"
                defaultChecked={this.state.status === "ON_HOLD"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                SUSPENDUES
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="ON_HOLD_BY_ADMIN"
                defaultChecked={this.state.status === "ON_HOLD_BY_ADMIN"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                SUSPENDUES Par dl
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="ARCHIVED"
                defaultChecked={this.state.status === "ARCHIVED"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                archivées
              </span>
            </Label>
            <Label check className="ListeOfferHeader-label radio">
              <Input
                type="radio"
                onChange={e => this.onChange(e)}
                name="radio1"
                id="DELETED"
                defaultChecked={this.state.status === "DELETED"}
              />
              <span
                style={{
                  textTransform: "uppercase"
                }}
              >
                supprimées
              </span>
            </Label>
          </Row>
          <Row>
            <Col
              sm={8}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 8
              }}
            >
              <InputGroup>
                <InputGroupAddon
                  addonType="prepend"
                  style={{
                    backgroundColor: "#e8e8e8",
                    width: "3em",
                    border: "1px solid #ced4da"
                  }}
                >
                  <SearchIcon
                    style={{
                      margin: "auto",
                      color: "#6b6b6b",
                      fontSize: "1.3em"
                    }}
                  />
                </InputGroupAddon>
                <Input
                  className="Profil-group__input"
                  placeholder="Rechercher..."
                  type="text"
                  value={this.state.search}
                  onChange={this.onChangeSearch}
                />
              </InputGroup>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 8
              }}
            >
              <Select
                className="Profil-group__input"
                onSelect={this.onSelect}
                name={"status"}
                items={sortOffersConst}
              />
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}

export default HeaderListesOffers;
