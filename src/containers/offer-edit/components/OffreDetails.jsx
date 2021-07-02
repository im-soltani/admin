import React, { Fragment } from "react";
import { Label } from "reactstrap";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import * as moment from "moment";
import PropTypes from "prop-types";
import OfferDetailTabs from "./OfferDetailTabs";
import { GET_OFFER_BY_NUM } from "../../../handler/queries";

class OffreDetails extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };
  render() {
    return (
      <Query
        query={GET_OFFER_BY_NUM}
        variables={{ num: this.props.match.params.num }}
      >
        {({ data, loading, error, refetch }) => {
          if (loading) return <div />;
          else if (error) return <p>ERROR</p>;
          else if (data && data.getOfferByNum)
            return (
              <Fragment>
                <div>
                  <span className="OfferDetail-title">
                    {data.getOfferByNum.name}
                  </span>
                  <div className="OfferDetail-div__date">
                    <Label className="OfferItem-label">
                      <span className="OfferDetail-span__date">Créée le :</span>
                      {moment(data.getOfferByNum.createdAt).format(
                        "DD/MM/YYYY"
                      )}
                    </Label>
                    <Label
                      className="OfferItem-label"
                      style={{ marginLeft: "2em" }}
                    >
                      <span className="OfferDetail-span__date">
                        Expire le :
                      </span>
                      {moment(data.getOfferByNum.expiredAt).format(
                        "DD/MM/YYYY"
                      )}
                    </Label>
                  </div>
                </div>
                <div>
                  <OfferDetailTabs
                    refetch={refetch}
                    offer={data.getOfferByNum}
                    activeTab={
                      this.props.location && this.props.location.state
                        ? this.props.location.state.tab
                        : "1"
                    }
                  />
                </div>
              </Fragment>
            );
        }}
      </Query>
    );
  }
}
export default withRouter(OffreDetails);
