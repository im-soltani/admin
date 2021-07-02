import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Pagination from "react-js-pagination";
import HeaderListesOffers from "./HeaderListesOffers";
import OfferItem from "./OfferItem";
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
			sort: "recent",
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
	getSort = value => {
		this.setState({ sort: value });
	};

	onChangeSearch = value => {
		this.setState({ search: value });
	};

	sort = (a, b, sort) => {
		if (sort === "az") {
			var nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		} else if (sort === "za") {
			var nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA > nameB) return -1;
			if (nameA < nameB) return 1;
			return 0;
		} else if (sort === "old") {
			if (a.createdAt < b.createdAt) return -1;
			if (a.createdAt > b.createdAt) return 1;
			return 0;
		} else if (sort === "recent") {
			if (a.createdAt > b.createdAt) return -1;
			if (a.createdAt < b.createdAt) return 1;
			return 0;
		} else if (sort === "down") {
			if (a.application_number < b.application_number) return -1;
			if (a.application_number > b.application_number) return 1;
			return 0;
		} else if (sort === "up") {
			if (a.application_number > b.application_number) return -1;
			if (a.application_number < b.application_number) return 1;
			return 0;
		}
	};

	render() {
		const { activePage, status, sort, search } = this.state;

		return (
			<CardBody>
				<HeaderListesOffers
					getSort={this.getSort}
					getStatus={this.getStatus}
					onChangeSearch={this.onChangeSearch}
					status={status}
					sort={sort}
					search={search}
				/>
				<Query
					query={GET_OFFERS_BY_STATUS}
					variables={{
						state: status,
						search: search,
						skip: (activePage - 1) * 4,
						limit: 4,
						field: "name",
						direction: 1
					}}
					fetchPolicy="cache-and-network"
				>
					{({ data, loading, error }) => {
						if (loading) return <div />;
						else if (error) return <p>ERROR</p>;

						return (
							<Fragment>
								{data.getOffersByState &&
									data.getOffersByState.offers &&
									data.getOffersByState.offers.sort((a, b) => this.sort(a, b, sort)).map(offer => {
										return (
											<OfferItem
												key={offer.num}
												offer={offer}
												state={status}
												search={search}
												skip={(activePage - 1) * 4}
												limit={4}
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
