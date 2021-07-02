import React from "react";
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";

class Rating extends React.Component {
  static propTypes = {
    rating: PropTypes.number,
    getRating: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating ? props.rating : 1
    };
    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick = nextValue => {
    this.setState(
      {
        rating: nextValue
      },
      () => {
        this.props.getRating(nextValue);
      }
    );
  };

  render() {
    const { rating } = this.state;
    return (
      <div className="star-rating">
        <StarRatingComponent
          name="rate1"
          starCount={5}
          starColor={"rgb(247, 201, 62)"}
          value={rating}
          editing={!(rating === 0)}
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}

export default Rating;
