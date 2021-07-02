import PropTypes from "prop-types";
import React from "react";
import { Button, Card, CardTitle } from "reactstrap";

class LeftCard extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      button: 0,
    };
  }

  onClick = (button) => {
    this.setState({ button });
    this.props.handleChange(button);
  };

  render() {
    const { button } = this.state;
    return (
      <Card body outline color="secondary">
        <CardTitle className="Email-card__title">Paramètres</CardTitle>
        {/*    <Button
          onClick={() => this.onClick(1)}
          className={
            button === 1 ? "Email-card__button_active" : "Email-card__button"
          }
          style={{ marginBottom: 5 }}
        >
          Modèles de message
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button> */}
        <Button
          onClick={() => this.onClick(2)}
          className={
            button === 2 ? "Email-card__button_active" : "Email-card__button"
          }>
          Actions sur les offres
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(3)}
          className={
            button === 3 ? "Email-card__button_active" : "Email-card__button"
          }>
          Actions sur les entreprises
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(4)}
          className={
            button === 4 ? "Email-card__button_active" : "Email-card__button"
          }>
          Actions sur les candidats
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(5)}
          className={
            button === 5 ? "Email-card__button_active" : "Email-card__button"
          }>
          RGPD
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(6)}
          className={
            button === 6 ? "Email-card__button_active" : "Email-card__button"
          }>
          CGU
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(7)}
          className={
            button === 7 ? "Email-card__button_active" : "Email-card__button"
          }>
          Mentions légales
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
        <Button
          onClick={() => this.onClick(8)}
          className={
            button === 8 ? "Email-card__button_active" : "Email-card__button"
          }>
          Tutoriel
          <span className="MyCV-chevron">
            <i className="fa fa-chevron-right" />
          </span>
        </Button>
      </Card>
    );
  }
}

export default LeftCard;
