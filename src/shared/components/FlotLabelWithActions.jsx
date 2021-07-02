import React from "react";
import PropTypes from "prop-types";
import { Label } from "reactstrap";
import Alert from "../../handler/utils/Alert";

class FlotLabelWithActions extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    removeItem: PropTypes.func,
    getItem: PropTypes.func,
    enableDelete: PropTypes.bool,
    items: PropTypes.array.isRequired,
    refetch: PropTypes.func
  };

  static defaultProps = {
    className: "",
    enableDelete: false,
    label: "",
    items: []
  };
  constructor(props) {
    super(props);

    this.state = {
      items: props.items,
      loading: false,
      enableDelete: props.enableDelete
    };
    this.delete = this.delete.bind(this);
  }

  onResponse = cb => {
    this.setState(
      {
        loading: false
      },
      () => {
        cb();
      }
    );
  };

  delete = id => {
    this.props
      .removeItem({
        variables: {
          id
        }
      })
      .then(res => {
        this.onResponse(() => {
          console.log("res.data", res.data)
          Alert.success(res.data.removeSoftskill);
          this.props.refetch();
        });
      })
      .catch(e => {
        this.setState(
          {
            loading: false
          },
          () => {
            console.log(e);
          }
        );
      });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }

  render() {
    const { className, label } = this.props;
    const { items, enableDelete } = this.state;
    return (
      <div>
        <div>
          <Label className="Items-header">liste des {label}</Label>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {items &&
            items.map(item => {
              return (
                <div key={item.id} className={className}>
                  <div
                    onClick={() => this.props.getItem(item, true)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </div>

                  {enableDelete && (
                    <a
                      className="close-item-2"
                      onClick={() => this.delete(item.id)}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default FlotLabelWithActions;
