import React from "react";
import { Modal, ModalBody, Row, Col, Label } from "reactstrap";
import PropTypes from "prop-types";
import Parser from "html-react-parser";
import Button from "./Button";
import { etudeConst, work_timeConst, BASE_URL } from "../../handler/utils/constants";
import * as moment from "moment";
class ModalPreview extends React.Component {
	static propTypes = {
		offer: PropTypes.object,
		toggleModal: PropTypes.func,
		modal: PropTypes.bool
	};

	static defaultProps = {
		offer: {},
		modal: false
	};

	constructor(props) {
		super(props);

		this.state = {
			offer: props.offer ? props.offer : {},
			modal: props.modal
		};
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.offer !== this.props.offer) this.setState({ offer: nextProps.offer });
		if (nextProps.modal !== this.props.modal) this.setState({ modal: nextProps.modal });
	}

	render() {
		const { offer, modal } = this.state;
		const { toggleModal } = this.props;

		return (
			<Modal isOpen={modal} toggle={toggleModal} className="ModalCV">
				<ModalBody>
					<Row ClassNAme="OfferItemDetailHeader-nopadiing">
						<img
							src={offer.file ? offer.file : BASE_URL + "/media/banners/banner.png"}
							className="OfferItemDetailHeader-banner"
						/>
						<div className="OfferItemDetailHeader-opacity"> {offer.auteur}</div>
						<Col xs={6} md={3} lg={3} xl={3}>
							{/*  <img
                src={profile_pic_url}
                className="OfferItemDetailHeader-logo"
              /> */}
						</Col>
						<Col xs={6} md={6} lg={6} xl={6} className="OfferItemDetailHeader-col__middle">
							<div className="OfferItemDetailHeader-text headerText">{offer.name}</div>
							<div className="OfferItemDetailHeader-text">{offer.entreprise}</div>
							<div className="OfferItemDetailHeader-text">{offer.address}</div>
						</Col>
					</Row>
					<div
						style={{
							marginTop: "11rem",
							height: "13cm",
							borderBottom: "1px solid gray",
							overflow: "auto"
						}}
					>
						<Label className="OfferItemDetailHeader-label">Infos clés</Label>
						<Row
							className="OfferItemDetailHeader-row"
							style={{
								marginTop: 10
							}}
						>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Métier : </span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>{offer.job_name}</span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Salaire : </span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>
									{offer.salary_type === "Préciser le salaire (en KE)" ? (
										"Entre : " + offer.salary[0] + " (KE) et " + offer.salary[1] + " (KE)"
									) : (
										offer.salary_type
									)}
								</span>
							</Col>
						</Row>

						<Row className="OfferItemDetailHeader-row">
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Contract : </span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>{offer.contract}</span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Niveau d'étude : </span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>
									{offer.etude && etudeConst.filter(etude => etude.value === offer.etude)[0].label}
								</span>
							</Col>
						</Row>

						<Row className="OfferItemDetailHeader-row">
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Temps de travail: </span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>
									{" "}
									{offer.etude && work_timeConst.filter(work => work.value === offer.work_time)[0].label}
								</span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>
									Date d'expération de l'offre :{" "}
								</span>
							</Col>
							<Col xs={6} md={6} lg={3} xl={3}>
								<span style={{ fontSize: 14 }}>{moment(offer.expiredAt).format("DD/MM/YYYY")}</span>
							</Col>
						</Row>
						<Row className="OfferItemDetailHeader-row">
							<Col sm={"3"}>
								<span style={{ fontSize: 14, color: "#295ebe", fontWeight: "bold" }}>Compétence(s) : </span>
							</Col>
							<Col>
								{offer.suggestions &&
									offer.suggestions.map((activ, index) => (
										<span key={index} style={{ fontSize: 14 }}>
											{activ.name} {index < offer.suggestions.length - 1 && ", "}
										</span>
									))}
							</Col>
						</Row>
						<Label className="OfferItemDetailHeader-label" style={{ marginTop: "2rem" }}>
							Description de l'offre
						</Label>
						{offer.description_poste && (
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									paddingLeft: 20
								}}
							>
								{Parser(offer.description_poste)}
							</div>
						)}
					</div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Button
							onClick={toggleModal}
							className="Profil-btn__cancel"
							size="lg"
							text="Retour"
							color="secondary"
							loading={false}
						/>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}

export default ModalPreview;
