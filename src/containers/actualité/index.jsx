import React from "react";
import PropTypes from "prop-types";
import { Container, Button } from "reactstrap";
import ListeActualité from "./components/ListeActualité";
import { withRouter } from "react-router-dom";
import Icon from "../../shared/components/Icon";
class MesActualité extends React.PureComponent {
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
				<ListeActualité />
				<div className="Button-add__div" title="Créer une actualité">
					<Button className="Button-add__btn" onClick={() => this.props.history.push("/creation-une-actualité")}>
						<Icon className="Button-add__btn-icon" name="add-actualité" />
					</Button>
				</div>
			</Container>
		);
	}
}
export default withRouter(MesActualité);
