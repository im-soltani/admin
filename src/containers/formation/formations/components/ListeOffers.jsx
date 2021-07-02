import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Pagination from "react-js-pagination";
import HeaderListesOffers from "./HeaderListesOffers";
import FormationItem from "./FormationItem";
import { GET_OFFERS_BY_STATUS } from "../../../../handler/queries";
import { CardBody } from "reactstrap";

class ListeOffers extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		data: PropTypes.object,
		getOffersByState: PropTypes.array
	};

	static defaultProps = {
		loading: false,
		error: null,
		data: {}
	};

	constructor(props) {
		super(props);

		this.state = {
			status: "PUBLISHED",
			field: "name",
			direction: 1,
			activePage: 1,
			search: ""
		};
	}

	handlePageChange = pageNumber => {
		this.setState({
			activePage: pageNumber,
			skip: pageNumber * 2
		});
	};

	getStatus = value => {
		this.setState({ status: value });
	};
	getSort = (field, direction) => {
		this.setState({ field, direction });
	};

	onChangeSearch = value => {
		this.setState({ search: value });
	};

	render() {
		const { activePage, status, search, field, direction } = this.state;

		return (
			<CardBody>
				<HeaderListesOffers
					getSort={this.getSort}
					getStatus={this.getStatus}
					onChangeSearch={this.onChangeSearch}
					status={status}
					field={field}
					direction={direction}
					search={search}
				/>
				<Query
					query={GET_OFFERS_BY_STATUS}
					variables={{
						state: status,
						search: search,
						skip: (activePage - 1) * 4,
						limit: 4,
						field,
						direction,
						offreType: "EDUCATION"
					}}
					fetchPolicy="cache-and-network"
				>
					{({ data, loading, error, refetch }) => {
						if (loading) return <div />;
						else if (error) return <p>ERROR</p>;

						return (
							<Fragment>
								{data.getOffersByState &&
									data.getOffersByState.offers &&
									data.getOffersByState.offers.map(offer => {
										return (
											<FormationItem
												key={offer.num}
												offer={offer}
												state={status}
												search={search}
												skip={(activePage - 1) * 4}
												limit={4}
												refetch={refetch}
											/>
										);
									})}
								<div style={{ textAlign: "center" }}>
									<Pagination
										prevPageText="Précédente"
										nextPageText="Suivante"
										firstPageText="Première"
										lastPageText="Dernière"
										activePage={activePage}
										itemsCountPerPage={4}
										innerClass={"pagination"}
										totalItemsCount={data.getOffersByState ? data.getOffersByState.totalCount : 0}
										pageRangeDisplayed={5}
										onChange={this.handlePageChange}
									/>
								</div>
							</Fragment>
						);
					}}
				</Query>
			</CardBody>
		);
	}
}

export default ListeOffers;
