import React from "react";
import PropTypes from "prop-types";
import {
  CardBody,
  ListGroup,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  FormFeedback
} from "reactstrap";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Button from "../../../shared/components/Button";
import PreviewEmail from "./PreviewEmail";
import { withRouter } from "react-router-dom";
import Alert from "../../../handler/utils/Alert";
import EditorHtml from "../../../shared/components/Editor";

const defaultErrors = {
  name: null,
  subject: null,
  template: null
};

class EmailForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    email: PropTypes.object,
    refetch: PropTypes.func,
    updateEmail: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: props.email.name,
      subject: props.email.subject,
      template: props.email.template,
      errors: {
        ...defaultErrors
      }
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setTemplateRef = ref => {
    if (ref) this.setState({ template: "<body>" + ref + "</body>" });
  };

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

  _handleAUpdate = () => {
    if (!this.state.loading) {
      const name = this.state.name;
      const template = this.state.template;
      const subject = this.state.subject;

      const errors = {
        ...defaultErrors
      };
      if (name.length < 2) errors.name = "Trop court";
      if (subject.length < 2) errors.subject = "Trop court";
      if (errors.name || errors.subject)
        this.setState({ errors: { ...errors } });
      else {
        this.setState({ loading: true, errors });

        this.props
          .updateEmail({
            variables: {
              id: this.props.email.id,
              input: {
                name,
                subject,
                template
              }
            }
          })
          .then(() => {
            Alert.success("Template a été sauvegardée avec succès");
            setTimeout(() => {
              this.setState({ loading: false });
              this.props.refetch();
              this.props.history.push("/parametres");
            }, 2000);
          })
          .catch(e => {
            this.onResponse(() => {
              console.log(e);
            });
          });
      }
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <CardBody>
        <ListGroup tag="div" className="Profil-group">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12} style={{ marginBottom: 6 }}>
              <FormGroup>
                <Label className="Profil-group__label" for="subject">
                  Sujet
                </Label>
                <Input
                  className="Profil-group__input"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.subject}
                  name="subject"
                  placeholder="Sujet de votre email"
                  invalid={!!errors.subject}
                />
                <FormFeedback>{errors.subject}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12} lg={12} xl={6} style={{ marginBottom: 6 }}>
              <FormGroup>
                <Label className="Profil-group__label" for="template">
                  Template
                </Label>
                <EditorHtml
                  description={this.state.template}
                  setDescriptionRef={this.setTemplateRef}
                />
                <FormFeedback>{errors.template}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={12} lg={12} xl={6} style={{ marginBottom: 6 }}>
              <PreviewEmail template={this.state.template} />
            </Col>
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

const UPDATE_EMAIL = gql`
  mutation updateEmail($id: ID!, $input: EmailInput!) {
    updateEmail(id: $id, input: $input) {
      name
    }
  }
`;

export default withRouter(
  compose(
    graphql(UPDATE_EMAIL, {
      name: "updateEmail"
    })
  )(EmailForm)
);
