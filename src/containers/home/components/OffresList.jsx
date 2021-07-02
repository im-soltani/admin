import React from "react";
import Panel from "../../../shared/components/Panel";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { GET_OFFERS_BY_STATUS } from "../../../handler/queries";
import { Link } from "react-router-dom";
import { Row, Col, Label } from "reactstrap";
import * as moment from "moment";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
class OffersList extends React.PureComponent {
	static propTypes = {
		getOffersByState: PropTypes.object,
		refetch: PropTypes.func
	};

	static defaultProps = {
		getOffersByState: []
	};
	render() {
		const { getOffersByState } = this.props;
		return (
			<Panel xl={12} lg={12} md={12} title="Offres récentes" refetch={this.props.refetch}>
				<Row style={{ padding: 30 }}>
					<Col md={6} xl={2} lg={6} xs={12}>
						<Label className="Application-th">Entreprise</Label>
					</Col>
					<Col md={6} xl={4} lg={6} xs={12}>
						<Label className="Application-th">Offre</Label>
					</Col>
					<Col md={6} xl={3} lg={6} xs={12}>
						<Label className="Application-th">Date de création</Label>
					</Col>
					<Col md={6} xl={2} lg={6} xs={12} />
				</Row>

				{getOffersByState &&
					getOffersByState.offers &&
					getOffersByState.offers.map(offer => {
						return (
							<Row key={offer.id} style={{ padding: "5px 0px" }}>
								<Col md={6} xl={2} lg={6} xs={12}>
									<Link to={`entreprise/${offer.entreprise.num}`}>
										<Label className="Application-td__name" style={{ cursor: "pointer" }}>
											<img className="Application-photo" src={offer.entreprise.profile_pic_url} />
											{offer.entreprise.name}
										</Label>
									</Link>
								</Col>
								<Col md={6} xl={4} lg={6} xs={12} style={{ display: "flex" }}>
									<Label className="Application-td">{offer.name}</Label>
								</Col>
								<Col md={6} xl={3} lg={6} xs={12} style={{ display: "flex" }}>
									<Label className="Application-td__name">{moment(offer.createdAt).format("DD/MM/YYYY")}</Label>
								</Col>
								<Col md={6} xl={2} lg={6} xs={12} style={{ display: "flex" }}>
									<Link to={`/offre/${offer.num}`} className="Application-btn__link">
										<span>voir plus</span>
									</Link>
								</Col>
							</Row>
						);
					})}
			</Panel>
		);
	}
}

export default graphql(GET_OFFERS_BY_STATUS, {
	options: () => ({
		variables: {
			state: "PUBLISHED",
			search: "",
			skip: 0,
			limit: 5,
			field: "createdAt",
			direction: -1,
			offreType: "JOB"
		},
		fetchPolicy: "cache-and-network"
	}),
	props: ({ data: { loading, error, getOffersByState, refetch } }) => ({
		loading,
		error,
		getOffersByState,
		refetch
	})
})(OffersList);
