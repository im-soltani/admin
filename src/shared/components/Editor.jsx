import React from "react";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

class EditorHtml extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    placeholder:PropTypes.string,
    description: PropTypes.string,
    setDescriptionRef: PropTypes.func
  };

  static defaultProps = {
    className: "",
    placeholder:"écrire ici"
  };

  contentBlock = htmlToDraft(
    this.props.description ? this.props.description : "<p></p>"
  );

  contentState = ContentState.createFromBlockArray(
    this.contentBlock.contentBlocks
  );

  state = {
    editorState: EditorState.createWithContent(this.contentState)
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    this.props.setDescriptionRef(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        localization={{
          locale: "fr"
        }}
        placeholder={this.props.placeholder}
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

export default EditorHtml;
