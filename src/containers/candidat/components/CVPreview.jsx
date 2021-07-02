import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import PdfPreview from "../../../shared/components//PdfPreview";

class CVPreview extends React.Component {
  static propTypes = {
    toggle: PropTypes.func,
    modal: PropTypes.bool,
    file: PropTypes.string
  };
  static defaultProps = {
    modal: false,
    file: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal
    };

    this._toggle = this._toggle.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.modal !== this.props.modal)
      this.setState({ modal: nextProps.modal });
  }

  _toggle() {
    this.props.toggle();
  }

  render() {
    const { modal } = this.state;
    const { file } = this.props;
    return (
      <Modal isOpen={modal} toggle={this._toggle} className="CVPreview">
        <ModalHeader
          toggle={this._toggle}
          style={{ textTransform: "uppercase" }}
        >
          aperçu du cv
        </ModalHeader>
        <ModalBody className="CVPreview-body">
          <PdfPreview file={file} />
        </ModalBody>
      </Modal>
    );
  }
}

export default CVPreview;
