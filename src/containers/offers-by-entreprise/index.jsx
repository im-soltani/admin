import React from "react";
import PropTypes from "prop-types";
import { Container, Button } from "reactstrap";
import ListeOffersByEntreprise from "./components/ListeOffersByEntreprise";
import { withRouter } from "react-router-dom";
import AddIcon from "mdi-react/BriefcaseAddOutlineIcon";

class EntrepriseOffers extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    getEmail: PropTypes.object,
    refetch: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    getEmail: {}
  };
  render() {
    return (
      <Container className="dashboard">
        <ListeOffersByEntreprise />
        <div className="Button-add__div" title="Ajouter">
          <Button
            className="Button-add__btn"
            onClick={() => this.props.history.push("/creation-une-offre")}
          >
            <AddIcon className="Button-add__btn-icon" />
          </Button>
        </div>
      </Container>
    );
  }
}
export default withRouter(EntrepriseOffers);
