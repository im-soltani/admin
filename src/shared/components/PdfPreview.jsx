import React from "react";
import PropTypes from "prop-types";
import { Document, Page } from "react-pdf";

class PdfPreview extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    file: PropTypes.any
  };
  static defaultProps = {
    className: "",
    file: null
  };
  constructor(props) {
    super(props);
    this.state = {
      file: props.file,
      numPages: 0,
      pageNumber: 1
    };
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.file !== this.props.file)
      this.setState({ file: nextProps.file });
  }

  nextPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;
    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
    this.setState({
      pageNumber: nextPageNumber
    });
  };

  precPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;
    if (
      currentPageNumber - 1 < 1 ||
      currentPageNumber - 1 > this.state.pageNumber
    ) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber - 1;
    }
    this.setState({
      pageNumber: nextPageNumber
    });
  };

  render() {
    const { pageNumber, numPages, file } = this.state;
    return (
      <div>
        {numPages > 1 && (
          <div className="pdf-center">
            <button
              title="Page précédente"
              className="MyCV-btn__middle"
              onClick={this.precPage}
            >
              <span className="lnr lnr-arrow-left pdf-center-icon"></span>
            </button>
            <span style={{ width: 10 }}></span>
            <button
              title="Page suivante"
              className="MyCV-btn__middle"
              onClick={this.nextPage}
            >
              <span className="lnr lnr-arrow-right pdf-center-icon"></span>
            </button>
          </div>
        )}
        <Document
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          renderMode="svg"
          error={<h4>Choisir un cv pdf valide ...</h4>}
          noData={
            <div className="pfd-no">
              <img src={`${process.env.PUBLIC_URL}/img/images/error.png`} />
              <br />
              <span>Document non encore communiqué</span>
            </div>
          }
          loading={<h4>En cours de traitement ...</h4>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        {file ? (
          <p>
            Page n° {pageNumber} de {numPages}
          </p>
        ) : null}
      </div>
    );
  }
}

export default PdfPreview;
