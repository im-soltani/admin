import React from "react";
import PropTypes from "prop-types";
import { Input, Label } from "reactstrap";
import axios from "axios";
import Button from "./Button";
import EyeIcon from "mdi-react/CloseIcon";
import Alert from "../../handler/utils/Alert";
import { BASE_URL } from "../../handler/utils/constants";
let target;
const defaultErrors = {
  name: null
};

class ItemActionSoftskill extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    item: PropTypes.object,
    addItems: PropTypes.func,
    updateItem: PropTypes.func,
    exportFunc: PropTypes.func,
    update: PropTypes.bool,
    getItem: PropTypes.func,
    refetch: PropTypes.func
  };

  static defaultProps = {
    className: "",
    label: "",
    update: false,
    item: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      names: null,
      errors: {
        ...defaultErrors
      }
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item && nextProps.item.name && nextProps.item.name.length > 0)
      this.setState({ names: nextProps.item.name });
    else this.setState({ names: null });
  }

  setNames = e => {
    if (e && e.target) {
      this.setState({
        names: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
      });
      target = e.target;
    }
  };

  _handleAction = () => {
    if (!this.props.update) {
      this.setState({ loading: true });
      let array = this.state.names.split(";");
      let data = [];
      array.map(item => {
        data.push({ name: item.charAt(0).toUpperCase() + item.slice(1) });
      });

      this.props
        .addItems({
          variables: {
            data
          }
        })
        .then(() => {
          Alert.success("Les softskill sont ajoutée avec succès");
          this.swithToAdd();
          this.props.refetch();
        })
        .catch(() => {
          this.setState(
            {
              loading: false
            },
            () => {
              Alert.success("Les softskill sont ajoutée avec succès");
              this.swithToAdd();
              this.props.refetch();
            }
          );
        });
    } else {
      this.setState({ loading: true });
      let name = this.state.names ? this.state.names : this.props.item.name;

      this.props
        .updateItem({
          variables: {
            id: this.props.item.id,
            name: name.charAt(0).toUpperCase() + name.slice(1)
          }
        })
        .then(() => {
          this.swithToAdd();
          this.props.refetch();
        })
        .catch(() => {
          this.setState(
            {
              loading: false
            },
            () => {
              Alert.warning("Cette softskill existe déjà");
            }
          );
        });
    }
  };
  _handleExport = () => {
    this.props
      .exportFunc()
      .then((responnse) => {
        console.log("responnse.data.exportSoftskill", responnse.data.exportSoftskill);
        axios({
          url: `${BASE_URL}${responnse.data.exportSoftskill}`,
          method: "GET",
          responseType: "blob" // important
        }).then(response => {
          console.log("respoonseee", response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Softskill" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false
          },
          () => {
            Alert.warning("erreur lors de l'exportation des softskill");
          }
        );
      });
  }
  swithToAdd = () => {
    this.props.getItem({}, false);
    this.setState({ loading: false, names: null });
    if (target) target.value = "";
  };

  render() {
    const { className, label, update } = this.props;
    const { loading, errors, names } = this.state;

    return (
      <div className={className}>
        <div style={{ position: "relative" }}>
          <Label className="Items-header">{label}</Label>
          <br />
          <Label className="Items-subheader">
            {!update
              ? `Vous pouvez ajouter un ou plusieurs softskill
               en les séparant par des ";" `
              : "Modifier softskill"}
          </Label>
        </div>
        <div className="form__form-group-field">
          <Input
            type="text"
            name="names"
            value={names}
            onChange={this.setNames}
            invalid={!!errors.name}
            className="Items-input"
          />
          <button
            disabled={!update}
            className={`form__form-group-button${update ? " active" : ""}`}
            style={{ height: 38 }}
            onClick={this.swithToAdd}
          >
            <EyeIcon />
          </button>
        </div>
        <div className="Items-btn__div">
          <Button
            onClick={this._handleAction}
            className="Items-btn__success"
            size="lg"
            text={update ? "MODIFIER" : "AJOUTER"}
            color="primary"
            loading={loading}
          />
        </div>

        <div className="Items-btn__div">
          <Button
            onClick={this._handleExport}
            className="Items-btn__success"
            size="lg"
            text={"EXPORTER"}
            color="primary"
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default ItemActionSoftskill;
