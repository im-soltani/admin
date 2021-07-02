import React from "react";
import { Col, Container, Row } from "reactstrap";
import ActualitéInfo from "./components/ActualitéInfo";
import ActualitéDescription from "./components/ActualitéDescription";
import GraphQlResult from "../../shared/components/GraphQLResult";
import PropTypes from "prop-types";
import { GET_ACTUALITY_BY_NUM } from "../../handler/queries";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import EditIcon from "mdi-react/EditIcon";
import { withRouter } from "react-router";

class Offer extends React.PureComponent {
	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.object,
		getActualiteByNum: PropTypes.object,
		history: PropTypes.object,
		location: PropTypes.object,
		match: PropTypes.object,
		refetch: PropTypes.func
	};

	static defaultProps = {
		loading: false,
		error: null,
		getActualiteByNum: null
	};
	render() {
		const { loading, error, getActualiteByNum, refetch } = this.props;
		return (
			<Container>
				<GraphQlResult error={error} loading={loading} emptyResult={!loading && !getActualiteByNum}>
					{getActualiteByNum && (
						<div className="profile" style={{ paddingTop: 30 }}>
							<Row>
								<Link to={`/actualité/${getActualiteByNum.num}`} style={{ paddingBottom: 20 }}>
									<span className="profile-div">
										{getActualiteByNum.title}
										<span className="profile-div2">{"n°" + getActualiteByNum.num}</span>
									</span>
								</Link>
							</Row>
							<Row>
								<Col md={12} lg={5} xl={4}>
									<Row>
										<ActualitéInfo actualité={getActualiteByNum} />
									</Row>
								</Col>
								<ActualitéDescription actualité={getActualiteByNum} refetch={refetch} />
							</Row>
							<div className="Button-add__div" title="Modifier">
								<Link
									className="Button-add__btn"
									to={{
										pathname: "/creation-une-actualité",
										state: {
											type: "update",
											actualite: getActualiteByNum
										}
									}}
								>
									<EditIcon className="Button-add__btn-icon" />
								</Link>
							</div>
						</div>
					)}
				</GraphQlResult>
			</Container>
		);
	}
}

export default withRouter(
	graphql(GET_ACTUALITY_BY_NUM, {
		options: props => ({
			variables: { num: props.match.params.num },
			fetchPolicy: "cache-and-network"
		}),
		props: ({ data: { loading, error, getActualiteByNum } }) => ({
			loading,
			error,
			getActualiteByNum
		})
	})(Offer)
);
