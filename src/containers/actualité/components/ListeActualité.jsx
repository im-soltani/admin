import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Pagination from "react-js-pagination";
import HeaderListesOffers from "./HeaderListesActualité";
import ActualiteItem from "./ActualitéItem";
import { GET_ACTUALITIES } from "../../../handler/queries";
import { CardBody } from "reactstrap";
const image = `${process.env.PUBLIC_URL}/img/images/not-found.jpg`;
import { Link } from "react-router-dom";
class ListeActualité extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		status: PropTypes.string,
		data: PropTypes.object,
		getActualite: PropTypes.func
	};

	static defaultProps = {
		loading: false,
		error: null,
		data: {}
	};

	constructor(props) {
		super(props);

		this.state = {
			status: props.status,
			field: null,
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
					query={GET_ACTUALITIES}
					variables={{
						state: status,
						search: search,
						skip: (activePage - 1) * 10,
						limit: 10,
						field,
						direction
					}}
					fetchPolicy="cache-and-network"
				>
					{({ data, loading, error, refetch }) => {
						if (loading) return <div />;
						else if (error) return <p>ERROR</p>;
						return (
							<Fragment>
								{data.getActualite &&
									data.getActualite.ActualiteResult &&
									data.getActualite.ActualiteResult.length > 0 ? (
										data.getActualite.ActualiteResult.map(ActualiteResult => {
											return (
												<ActualiteItem
													key={ActualiteResult.num}
													actualite={ActualiteResult}
													state={status}
													search={search}
													skip={(activePage - 1) * 4}
													limit={4}
													refetch={refetch}
												/>
											);
										})
									) : (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												textAlign: "center",
												alignSelf: "center",
												alignItems: "center"
											}}
										>
											<img src={image} style={{ minWidth: 300, width: "25%" }} />
											<span>
											Aucune actualité trouvée.
											<br />
											Vous pouvez commencer par <Link to="/creation-une-actualité">créer une Actus RH</Link>
											</span>
										</div>
									)}
								<div style={{ textAlign: "center" }}>
									<Pagination
										prevPageText="Précédente"
										nextPageText="Suivante"
										firstPageText="Première"
										lastPageText="Dernière"
										activePage={activePage}
										itemsCountPerPage={10}
										innerClass={"pagination"}
										totalItemsCount={data.getActualite ? data.getActualite.totalCount : 0}
										pageRangeDisplayed={10}
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

export default ListeActualité;
