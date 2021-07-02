import axios from "axios";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Card, CardBody, Col } from "reactstrap";
import Alert from "../../../handler/utils/Alert";
import { BASE_URL } from "../../../handler/utils/constants";
import Button from "../../../shared/components/Button";

class ExportCard extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    exportFunc: PropTypes.func,
    exportFunc2: PropTypes.func,
    exportFunc3: PropTypes.func,
    exportFunc4: PropTypes.func,
    exportFunc5: PropTypes.func,
    exportFunc6: PropTypes.func,
  };

  static defaultProps = {
    label: "",
    iconClassName: "",
    valueClassName: "",
  };
  _handleExport = () => {
    this.props
      .exportFunc()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportCandidates}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "candidates" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  _handleExport2 = () => {
    this.props
      .exportFunc2()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportCompetence}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Compétences" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  _handleExport3 = () => {
    this.props
      .exportFunc3()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportJobs}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Métiers" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  _handleExport4 = () => {
    this.props
      .exportFunc4()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportSoftskill}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Softskills" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  _handleExport5 = () => {
    this.props
      .exportFunc5()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportEntreprises}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Entreprises" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  _handleExport6 = () => {
    this.props
      .exportFunc6()
      .then((responnse) => {
        axios({
          url: `${BASE_URL}${responnse.data.exportEcole}`,
          method: "GET",
          responseType: "blob", // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Écoles" + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () => {
            Alert.warning("erreur lors de l'exportation des métier");
          }
        );
      });
  };
  render() {
    return (
      <Col md={12} xl={12} lg={12} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="statistics-card__container">
              <div className={"statistics-card__label".trim()}>EXPORTS</div>
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "row",
                }}>
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Candidats"}
                  color="primary"
                  onClick={this._handleExport}
                />
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Compétences"}
                  color="primary"
                  onClick={this._handleExport2}
                />
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Métiers"}
                  color="primary"
                  onClick={this._handleExport3}
                />
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Softskills"}
                  color="primary"
                  onClick={this._handleExport4}
                />
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Enreprises"}
                  color="primary"
                  onClick={this._handleExport5}
                />
                <Button
                  className="butnStat"
                  size="lg"
                  text={"Écoles"}
                  color="primary"
                  onClick={this._handleExport6}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ExportCard;
