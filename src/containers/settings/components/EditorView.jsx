import React from "react";
import PropTypes from "prop-types";
import {
  CardBody,
  ListGroup,
  Row,
  Col,
  Label,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { graphql, compose } from "react-apollo";

import gql from "graphql-tag";
import Button from "../../../shared/components/Button";
//import Preview from "./Preview";
import { withRouter } from "react-router-dom";
import Alert from "../../../handler/utils/Alert";
import EditorHtml from "../../../shared/components/Editor";

const defaultErrors = {
  template: null,
};

class EditorView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    variable: PropTypes.string,
    items: PropTypes.object,
    refetch: PropTypes.func,
    updateSettings: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      template: props.items ? props.items[props.variable] : null,
      errors: {
        ...defaultErrors,
      },
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.variable !== this.props.variable) {
      this.setState({ template: nextProps.items[nextProps.variable] });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setTemplateRef = (ref) => {
    if (ref) this.setState({ template: "<body>" + ref + "</body>" });
  };

  onResponse = (cb) => {
    this.setState(
      {
        loading: false,
      },
      () => {
        cb();
      }
    );
  };

  _handleAUpdate = () => {
    if (!this.state.loading) {
      const variable = this.props.variable;
      const template = this.state.template;

      const errors = {
        ...defaultErrors,
      };

      if (template.length < 2) errors.template = "Trés court";
      if (errors.template) this.setState({ errors: { ...errors } });
      else {
        this.setState({ loading: true, errors });

        this.props
          .updateSettings({
            variables: {
              variable: variable,
              value: template,
            },
          })
          .then((res) => {
            if (res.data.updateSettings) {
              Alert.success("Template a été sauvegardée avec succès");
              setTimeout(() => {
                this.setState({ loading: false });
                this.props.refetch();
                this.props.history.push("/parametres");
              }, 2000);
            } else Alert.warning("Erreur");
          })
          .catch((e) => {
            this.onResponse(() => {
              console.log(e);
            });
          });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { variable } = this.props;

    return (
      <CardBody>
        <ListGroup tag="div" className="Profil-group">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12} style={{ marginBottom: 6 }}>
              <FormGroup>
                <Label className="Profil-group__label" for="template">
                  {variable === "rgpd"
                    ? "RGPD"
                    : variable === "legal"
                    ? "Mentions légales"
                    : variable === "cgu"
                    ? "CGU"
                    : "Tutoriel"}
                </Label>
                <EditorHtml
                  description={this.state.template}
                  setDescriptionRef={this.setTemplateRef}
                  variable={variable}
                />
                <FormFeedback>{errors.template}</FormFeedback>
              </FormGroup>
            </Col>
            {/* <Col xs={12} md={12} lg={12} xl={6} style={{ marginBottom: 6 }}>
              <Preview template={this.state.template} />
            </Col> */}
          </Row>
        </ListGroup>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => this.props.history.push("/parametres")}
            className="Profil-btn__cancel"
            size="lg"
            text="Annuler"
            color="secondary"
            loading={this.state.loading}
          />

          <Button
            onClick={this._handleAUpdate}
            className="Profil-btn__success"
            size="lg"
            text={"SAUVEGARDER"}
            color="primary"
            loading={this.state.loading}
          />
        </div>
      </CardBody>
    );
  }
}

const UPDATE_SETTINGS = gql`
  mutation updateSettings($variable: String!, $value: String!) {
    updateSettings(variable: $variable, value: $value)
  }
`;

export default withRouter(
  compose(
    graphql(UPDATE_SETTINGS, {
      name: "updateSettings",
    })
  )(EditorView)
);
