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

export default class AutosuggestionInput extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    getValue: PropTypes.func,
    oldValue: PropTypes.string,
    pushSelectedSuggestion: PropTypes.func
  };

  static defaultProps = {
    className: "",
    items: []
  };
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      oldValue: props.oldValue,
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    if (event)
      this.setState({
        value: newValue
      });
    this.props.getValue(newValue);
    if (this.state.suggestions.length > 0)
      this.props.pushSelectedSuggestion(this.state.suggestions[0]);
  };
  onSuggestionSelected = (event, { suggestion }) => {
    if (event) {
      this.props.pushSelectedSuggestion(suggestion);
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
    const { value, suggestions, oldValue } = this.state;

    const inputProps = {
      placeholder: "Saisissez le titre de l'offre...",
      value: value ? value : oldValue ? oldValue : "",
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
