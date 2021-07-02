import React from "react";
import PropTypes from "prop-types";
import { Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Icon from "../../../shared/components/Icon";

class ListeEmails extends React.PureComponent {
  static propTypes = {
    emails: PropTypes.array
  };

  static defaultProps = {
    emails: []
  };

  render() {
    const { emails } = this.props;
    return (
      <Container className="Email-container">
        <div className="Email-list__title">Modèles des messages</div>
        <Table hover responsive>
          <thead>
            <tr className="Email-tr__header">
              <th style={{ width: "20%" }}>Titre</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {emails.map(email => {
              return (
                <tr key={email.id} className="Email-tr">
                  <th scope="row">{email.subject}</th>
                  <td>{email.template.substring(0, 200)}...</td>
                  <td>
                    <div style={{ cursor: "pointer" }}>
                      <Link
                        to={{
                          pathname: `/emails/${email.id}`,
                          state: {
                            tab: "2"
                          }
                        }}
                      >
                        <Icon
                          className="OfferItem__edit-offer"
                          name="edit-offer"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ListeEmails;
