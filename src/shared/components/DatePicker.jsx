import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, { formatDate } from "react-day-picker/moment";
import PropTypes from "prop-types";
import * as moment from "moment";
import "moment/locale/fr";

export default class DatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    local: PropTypes.string,
    disabledDays: PropTypes.object,
    getDate: PropTypes.func,
    defaultValue: PropTypes.number,
    show: PropTypes.Boolean
  };

  static defaultProps = {
    className: "",
    disabledDays: {},
    local: "fr"
  };

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: props.defaultValue
        ? new Date(props.defaultValue)
        : new Date(),
      isEmpty: false,
      isDisabled: false
    };
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    if (moment().diff(moment(selectedDay), "days") > 0) {
      this.setState({
        selectedDay: new Date(),
        isEmpty: !input.value.trim(),
        isDisabled: modifiers.disabled === true
      });
      this.props.getDate(new Date());
    } else {
      this.setState({
        selectedDay,
        isEmpty: !input.value.trim(),
        isDisabled: modifiers.disabled === true
      });
      this.props.getDate(selectedDay);
    }
  }

  render() {
    const { selectedDay, isDisabled, isEmpty } = this.state;
    const { local, className, show } = this.props;
    return (
      <div>
        <DayPickerInput
          value={show ? "jj/mm/aaaa" : formatDate(selectedDay, "LL", local)}
          className={className}
          onDayChange={this.handleDayChange}
          placeholder={`${formatDate(new Date(), "LL", local)}`}
          dayPickerProps={{
            selectedDays: selectedDay,
            locale: this.props.local,
            localeUtils: MomentLocaleUtils,
            month: selectedDay,
            modifiers: {
              disabled: [
                {
                  before: new Date()
                }
              ]
            }
          }}
        />
        <p style={{ marginTop: "1em", color: "gray", fontSize: "1.3em" }}>
          {isEmpty && "Veuillez choisir une date"}
          {!isEmpty && !selectedDay && "Cette date est incorrecte"}
          {selectedDay && isDisabled && "Cette date est désactivée"}
        </p>
      </div>
    );
  }
}
