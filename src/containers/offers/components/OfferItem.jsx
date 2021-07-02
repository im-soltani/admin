import React from "react";
import PropTypes from "prop-types";
import { Container, Label, Button, Row, Col } from "reactstrap";
import { graphql, compose } from "react-apollo";

import gql from "graphql-tag";
import StickyLabels from "../../../shared/components/StickyLabels";
import Icon from "../../../shared/components/Icon";
import * as moment from "moment";
import { GET_OFFERS_BY_STATUS } from "../../../handler/queries";
import { withRouter, Link } from "react-router-dom";
import Alert from "../../../handler/utils/Alert";
import { confirmAlert } from "react-confirm-alert"; // Import

class OfferItem extends React.PureComponent {
	static propTypes = {
		history: PropTypes.object,
		location: PropTypes.object,
		match: PropTypes.object,
		offer: PropTypes.object,
		state: PropTypes.string,
		search: PropTypes.string,
		skip: PropTypes.number,
		limit: PropTypes.number,
		updateOfferState: PropTypes.func,
		duplicateOffer: PropTypes.func,
		onUpdateted: PropTypes.func,
		refetch: PropTypes.func
	};

	static defaultProps = {
		offer: {},
		status: "DRAFT",
		sort: "recent",
		skip: 0,
		limit: 4,
		search: ""
	};

	onUpdate = state => {
		this.props
			.updateOfferState({
				variables: {
					id: this.props.offer.id,
					state: state
				},
				refetchQueries: [
					{
						query: GET_OFFERS_BY_STATUS,
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
				Alert.success("Etat changé avec succès");
			});
	};

	_handleDuplicate = () => {
		this.props
			.duplicateOffer({
				variables: {
					id: this.props.offer.id
				},
				refetchQueries: [
					{
						query: GET_OFFERS_BY_STATUS,
						variables: {
							state: "DRAFT",
							search: "",
							skip: 0,
							limit: 4
						}
					}
				]
			})
			.then(res => {
				Alert.success("Offre dupliquée avec succès");
				this.props.refetch();
				this.props.history.push({
					pathname: `/offre/${res.data.duplicateOffer.num}`,
					state: { tab: "2" }
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	render() {
		const { offer } = this.props;
		return (
			<Container key={offer.num} className="OfferItem">
				<Row>
					<Col xs={12} md={5} lg={5} xl={5}>
						{offer.state !== "DRAFT" &&
							offer.application_number > 0 && (
								<div id="talkbubble" style={{ cursor: "pointer" }} title="Nouvelles candidatures">
									<Link to={`/modifier-offre/${offer.num}`}>{offer.application_number}</Link>
								</div>
							)}
						<div style={{ marginLeft: 25 }}>
							<Label className="OfferItem-name">
								<Link to={`/offre/${offer.num}`}>{offer.name}</Link>
							</Label>
							<Label
								className="OfferItem-label"
								style={{
									fontWeight: 600,
									color: "#828181",
									textTransform: "uppercase"
								}}
							>
								{offer.entreprise.name}
							</Label>
							<br />
							<Label className="OfferItem-label">Créée le {moment(offer.createdAt).format("DD/MM/YYYY")}</Label>
							{offer.state !== "DRAFT" && <br />}
							{offer.state !== "DRAFT" && (
								<div style={{ cursor: "pointer" }} title="Candidatures au total">
									<Label className="OfferItem-label" style={{ cursor: "pointer" }}>
										<Link to={`/modifier-offre/${offer.num}`}>
											Nb. candidatures :
											<span style={{ color: "#1e43c3", fontWeight: 600 }}>
												{"  " + offer.all_application_number ? offer.all_application_number : 0}
											</span>
										</Link>
									</Label>
								</div>
							)}
						</div>
					</Col>

					<Col xs={12} md={4} lg={4} xl={4}>
						<StickyLabels items={offer.competences} className="OfferItem-sticky" />
					</Col>
					<Col xs={12} md={1} lg={1} xl={1}>
						{offer.state === "DRAFT" && (
							<Button className="OfferItem-btn__draft" onClick={() => this.onUpdate("PUBLISHED")}>
								Publier
							</Button>
						)}
						{offer.state === "PUBLISHED" && <Button className="OfferItem-btn__rien">Rien</Button>}
						{offer.state === "ON_HOLD" && (
							<Button className="OfferItem-btn__draft" onClick={() => this.onUpdate("PUBLISHED")}>
								Republier
							</Button>
						)}
					</Col>
					<Col xs={12} md={2} lg={2} xl={2} className="box_btn">
						<Row
							style={{
								display: "flex",
								flexDirection: "row-reverse"
							}}
							className="Row-up"
						>
							<div title="Supprimer"
								onClick={() =>
									confirmAlert({
										title: "Suppression d'une offre",
										message: "Êtes-vous sûr de vouloir supprimer cette offre ?",
										buttons: [
											{
												label: "Oui",
												onClick: () => this.onUpdate("DELETED")
											},
											{
												label: "Non",
												onClick: () => { }
											}
										]
									})}
								style={{ cursor: "pointer" }}>
								<Icon className="OfferItem__remove-offer" name="remove-offer" />
							</div>
							{(offer.state === "PUBLISHED" ||
								offer.state === "ON_HOLD" ||
								offer.state === "ON_HOLD_BY_ADMIN") && (
									<div title="Archiver" onClick={() => this.onUpdate("ARCHIVED")} style={{ cursor: "pointer" }}>
										<Icon className="OfferItem__archive-offer" name="archive-offer" />
									</div>
								)}
							{(offer.state === "PUBLISHED") && (
								<div title="Suspendre" onClick={() => this.onUpdate("ON_HOLD")} style={{ cursor: "pointer" }}>
									<Icon className="OfferItem__hold-offer" name="hold-offer" />
								</div>
							)}
							{offer.state !== "ARCHIVED" && (
								<div style={{ cursor: "pointer" }} title="Modifier">
									<Link
										to={{
											pathname: `/modifier-offre/${offer.num}`,
											state: {
												tab: "2"
											}
										}}
									>
										<Icon className="OfferItem__edit-offer" name="edit-offer" />
									</Link>
								</div>
							)}
							<div style={{ cursor: "pointer" }} onClick={this._handleDuplicate} title="Dupliquer">
								<Icon className="OfferItem__dup-offer" name="offer-dup" />
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}
const UPDATE_OFFER_STATE = gql`
	mutation updateOfferState($id: ID!, $state: String!) {
		updateOfferState(id: $id, state: $state) {
			name
		}
	}
`;
const DUPLICATE_OFFER = gql`
	mutation duplicateOffer($id: ID!) {
		duplicateOffer(id: $id) {
			name
			id,
			num
		}
	}
`;
export default withRouter(
	compose(
		graphql(UPDATE_OFFER_STATE, {
			name: "updateOfferState"
		}),
		graphql(DUPLICATE_OFFER, {
			name: "duplicateOffer"
		})
	)(OfferItem)
);
