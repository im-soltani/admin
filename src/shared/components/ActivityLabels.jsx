import React from "react";
import PropTypes from "prop-types";

class ActivityLabels extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    delete: PropTypes.func,
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    className: "",
    items: []
  };
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };
    this.delete = this.delete.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }
  delete = index => {
    this.props.delete(index);
  };
  render() {
    const { className } = this.props;
    const { items } = this.state;
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items &&
          items.map((item, index) => {
            return (
              <div
                key={item}
                className={className}
                style={{ marginBottom: 10 }}
              >
                {item}

                <a
                  className="close-item-2"
                  onClick={() => this.delete(index)}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default ActivityLabels;
