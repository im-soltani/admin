import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import Icon from "../../../shared/components/Icon";
import * as moment from "moment";

class ActualitéInfo extends React.PureComponent {
	static propTypes = {
		actualité: PropTypes.object.isRequired,
		candidat: PropTypes.object,
		setKeyName: PropTypes.func,
		show: PropTypes.bool,
		fromApp: PropTypes.bool
	};
	static defaultProps = {
		show: true,
		candidat: {},
		fromApp: false,
		actualité: {}
	};
	render() {
		const { actualité, fromApp } = this.props;
		return (
			<React.Fragment>
				<Col md={12} lg={12} xl={12}>
					<Card>
						<CardBody
							className="profile__card--calendar"
							style={fromApp ? { "box-shadow": "2px 2px 10px #e6e6e6" } : {}}
						>
							<Row>
								<span
									className="EntrepriseDetail-competences__row-header"
									style={{ textTransform: "uppercase", padding: "1em" }}
								>
									{actualité.title}
									<br />
									<span
										className="EntrepriseDetail-competences__row-header"
										style={{
											textTransform: "uppercase",
											marginRight: 10,
											color: "#adadad",
											fontSize: "0.9rem"
										}}
									>
										{"Actus RH n°" + actualité.num}
									</span>{" "}
								</span>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md={12} lg={12} xl={12}>
					<Card>
						<CardBody
							className="profile__card--calendar"
							style={fromApp ? { "box-shadow": "2px 2px 10px #e6e6e6" } : {}}
						>
							<Row className="EntrepriseDetail-competences__row-header" style={{ textTransform: "uppercase" }}>
								Informations
							</Row>
							<p className="EntrepriseDetail-info-label__cion">
								<Icon className="EntrepriseDetail-icon" name="candidat-time" />
								Création:{" "}
								<span className="EntrepriseDetail-info-label">{moment(actualité.createdAt).format("DD/MM/YYYY")}</span>
							</p>
							<p className="EntrepriseDetail-info-label__cion">
								<Icon className="EntrepriseDetail-icon" name="candidat-time" />
								Publication:{" du "}
								<span className="EntrepriseDetail-info-label">
									{moment(actualité.startPublication).format("DD/MM/YYYY")}
								</span>
								{" au "}
								<span className="EntrepriseDetail-info-label">
									{moment(actualité.endPublication).format("DD/MM/YYYY")}
								</span>
							</p>
							{actualité.eventDate && (
								<p className="EntrepriseDetail-info-label__cion">
									<Icon className="EntrepriseDetail-icon" name="candidat-time" />
									Date de l'évènement:{" "}
									<span className="EntrepriseDetail-info-label">
										{moment(actualité.eventDate).format("DD/MM/YYYY")}
									</span>
								</p>
							)}
						</CardBody>
					</Card>
				</Col>
				<Col md={12} lg={12} xl={12}>
					<Card>
						<CardBody
							className="profile__card--calendar"
							style={fromApp ? { "box-shadow": "2px 2px 10px #e6e6e6" } : { padding: "2em" }}
						>
							<Row>
								<p className="EntrepriseDetail-info-label__cion">
									Auteur: <span className="EntrepriseDetail-info-label">{actualité.entreprise.name}</span>
								</p>
							</Row>
							<Row>
								<p className="EntrepriseDetail-info-label__cion">
									Lien: <span className="EntrepriseDetail-info-label">{actualité.lien}</span>
								</p>
							</Row>
							{!actualité.visibleToCandidat && !actualité.visibleToAdherent ? null :
							<Row>
								<p className="EntrepriseDetail-info-label__cion">
								 Visible pour: <span className="EntrepriseDetail-info-label">{actualité.visibleToCandidat ? "Candidat " : null} {actualité.visibleToCandidat && actualité.visibleToAdherent ? " , " : null} {actualité.visibleToAdherent ? "Adhérent" : null}</span>
								</p>
							</Row>}
						</CardBody>
					</Card>
				</Col>
			</React.Fragment>
		);
	}
}

export default ActualitéInfo;
