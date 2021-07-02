import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import PdfPreview from "../../../shared/components/PdfPreview";
import "moment/locale/fr";
import Button from "../../../shared/components/Button";
import axios from "axios";

class ProfilCV extends React.Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  download = () => {
    const { file } = this.props;
    axios({
      url: file,
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", this.props.name + "-cv.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    const { file } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Row className="Candidat-info__row-header">
          <Col>
            {file && file.substr(file.length - 3) === "pdf" && (
              <Button
                onClick={this.download}
                className="Candidat-download"
                size="lg"
                text="Télécharger le CV"
                loading={loading}
              />
            )}
          </Col>
        </Row>
        <Row className="Candidat-info__row">
          <Col
            xs={12}
            md={12}
            lg={12}
            xl={12}
            className="Candidat-cv__col"
            style={{ marginBottom: 30 }}
          >
            <PdfPreview file={file} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfilCV;
