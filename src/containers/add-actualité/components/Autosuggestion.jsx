import React from "react";
import Autosuggest from "react-autosuggest";
import PropTypes from "prop-types";

const getSuggestions = (value, items) => {
  if (items) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : items.filter(lang => lang.name.toLowerCase().includes(inputValue));
  } else return [];
};

const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

export default class Autosuggestion extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    pushSelectedSuggestion: PropTypes.func,
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    className: "",
    items: []
  };
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue ? this.props.defaultValue : "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    if (event)
      this.setState({
        value: newValue
      });
  };
  onSuggestionSelected = (event, { suggestion }) => {
    if (event) {
      this.props.pushSelectedSuggestion(suggestion);
      this.setState({ value: suggestion.name });
    }
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.items)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Saisissez le nom...",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
