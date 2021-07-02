import React from "react";
import PropTypes from "prop-types";
import { Container, Label, Row, Col } from "reactstrap";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Icon from "../../../shared/components/Icon";
import * as moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Parser from "html-react-parser";
import { GET_ACTUALITIES } from "../../../handler/queries";
const MAX_LENGTH = 25;

class ActualitéItem extends React.PureComponent {
	static propTypes = {
		actualite: PropTypes.object,
		state: PropTypes.string,
		search: PropTypes.string,
		skip: PropTypes.number,
		limit: PropTypes.number,
		deleteActualite: PropTypes.func,
		refetch: PropTypes.func
	};

	static defaultProps = {
		actualite: {},
		sort: "recent",
		skip: 0,
		limit: 10,
		search: ""
	};
	state = { modalOpen: false };
	onDelete = () => {
		this.props
			.deleteActualite({
				variables: {
					id: this.props.actualite._id
				},
				refetchQueries: [
					{
						query: GET_ACTUALITIES,
						variables: {
							state: this.props.state,
							search: this.props.search,
							skip: this.props.skip,
							limit: this.props.limit,
							field: "name",
							direction: 1
						}
					}
				]
			})
			.then(() => {
				this.props.refetch();
			});
	};
	render() {
		const { actualite } = this.props;
		return (
			<Container key={actualite.num} className="OfferItem">
				<Row>
					<Col xs={12} md={4} lg={4} xl={4}>
						<div style={{ marginLeft: 25 }} className="bloc_t">
							<Label className="OfferItem-name">
								<Link to={`/actualité/${actualite.num}`}>
									{actualite.title.length > MAX_LENGTH ? (
										<div>{`${actualite.title.substring(0, MAX_LENGTH)}...`}</div>
									) : (
											actualite.title
										)}
								</Link>
							</Label>
							<Label
								className="OfferItem-label"
								style={{
									color: "#828181"
								}}
							>
								<div style={{ alignItems: "center" }}>
									<span style={{ color: "#000", fontWeight: "bold" }}>{actualite.entreprise.name} </span>
								</div>
								<div>Publiée le: {moment(actualite.startPublication).format("DD/MM/YYYY")}</div>
								{actualite.eventDate && (
									<span>
										<Icon className="EntrepriseDetail-icon" name="calendrier" /> {" "}
										Évènement le {" "}{moment(actualite.eventDate).format("DD/MM/YYYY")}
										<br />
									</span>
								)}
							</Label>
						</div>
					</Col>
					<Col xs={12} md={5} lg={6} xl={7} className="bloc_marg">
						<div className="max-lines">{Parser(actualite.description)}</div>
						{actualite.lien &&
							<div
								style={{
									color: "blue", cursor: "pointer",
									justifyContent: "flex-end", display: "flex",
									paddingTop: "1rem", flexDirection: "row"
								}}
								onClick={() => window.open(actualite.lien, "actualite.title", "resizable=yes")}
							>
								<Icon className="EntrepriseDetail-icon" name="out-icon" />
								<span style={{ fontWeight: "bold", fontSize: "0.9rem", }}>
									Voir plus
							</span>
							</div>}
					</Col>
					<Col xs={12} md={2} lg={2} xl={1} style={{ alignItems: "center", alignSelf: "center" }}>
						<Row style={{ display: "flex", flexDirection: "row-reverse" }} className="Row-up rou">
							<div
								className="rouR"
								title="Supprimer"
								onClick={() =>
									confirmAlert({
										title: "Suppression d'une Actus RH",
										message: "Êtes-vous sûr de vouloir supprimer cette Actus RH ?",
										buttons: [
											{
												label: "Oui",
												onClick: () => this.onDelete()
											},

											{
												label: "Non",
												onClick: () => { }
											}
										]
									})}
								style={{ cursor: "pointer", marginRight: "15px" }}
							>
								<Icon className="OfferItem__remove-offer" name="remove-offer" />
							</div>
							<div className="rouR" style={{ cursor: "pointer" }} title="Modifier">
								<Link
									to={{
										pathname: "/creation-une-actualité",
										state: {
											type: "update",
											actualite
										}
									}}
								>
									<Icon className="OfferItem__edit-offer" name="edit-offer" />
								</Link>
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}
const REMOVE_ACTUALITE = gql`
	mutation deleteActualite($id: ID!) {
		deleteActualite(id: $id)
	}
`;

export default withRouter(compose(graphql(REMOVE_ACTUALITE, { name: "deleteActualite" }))(ActualitéItem));
