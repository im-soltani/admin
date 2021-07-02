import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";

export default class AddressAutocomplete extends React.Component {
  static propTypes = {
    setAddress: PropTypes.func,
    addressEntreprise: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: props.addressEntreprise.address
        ? props.addressEntreprise.address
        : "",
      zip_code: props.addressEntreprise.zip_code
        ? props.addressEntreprise.zip_code
        : "",
      country: props.addressEntreprise.country
        ? props.addressEntreprise.country
        : "",
      city: props.addressEntreprise.city ? props.addressEntreprise.city : "",
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    let addressI = null;
    let zip_codeI = null;
    let countryI = null;
    let cityI = null;
    geocodeByAddress(address)
      .then((results) => {
        addressI = results[0].formatted_address;
        results[0].address_components.map((cmp) => {
          cmp.types.map((type) => {
            if (type === "postal_code") zip_codeI = cmp.long_name;
            if (type === "country") countryI = cmp.long_name;
            if (type === "locality") cityI = cmp.long_name;
          });
        });

        this.setState({
          address: addressI,
          zip_code: zip_codeI,
          country: countryI,
          city: cityI,
        });

        getLatLng(results[0]).then((latlng) => {
          this.props.setAddress({
            address: addressI,
            zip_code: zip_codeI,
            country: countryI,
            city: cityI,
            location: { latitude: latlng.lat, longitude: latlng.lng },
          });
        });
      })

      .catch((error) => console.error("Error", error));
  };

  render() {
    const searchOptions = {
      componentRestrictions: { country: ["fr", "tn"] },
    };
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Entrez votre adresse...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
