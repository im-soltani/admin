import React from "react";
import PropTypes from "prop-types";

class StickyLabels extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    delete: PropTypes.func,
    enableDelete: PropTypes.bool,
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    className: "",
    enableDelete: false,
    items: []
  };
  constructor(props) {
    super(props);

    this.state = {
      items: props.items,
      enableDelete: props.enableDelete
    };
    this.delete = this.delete.bind(this);
  }
  delete = index => {
    this.props.delete(index);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }

  render() {
    const { className } = this.props;
    const { items, enableDelete } = this.state;
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items &&
          items.map((item, index) => {
            return (
              <div key={item.id} className={className}>
                {item.name}
                {enableDelete && (
                  <a
                    className="close-item-2"
                    onClick={() => this.delete(index)}
                  />
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

export default StickyLabels;
