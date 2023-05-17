import { useState } from "react";

const useReverseGeocode = (lat, lng) => {
  const [result, setResult] = useState("");
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
  const apiKey = "AIzaSyB1gs_45smkaCkjq_MbAhX-5NIaJ6erplo";
  const extractAddress = (place) => {
    const address = {
      city: "",
      state: "",
      zip: "",
      country: "",
      plain() {
        const city = this.city ? this.city + ", " : "";
        const zip = this.zip ? this.zip + ", " : "";
        const state = this.state ? this.state + ", " : "";
        return city + zip + state + this.country;
      },
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("locality")) {
        address.city = value;
      }

      if (types.includes("administrative_area_level_2")) {
        address.state = value;
      }

      if (types.includes("postal_code")) {
        address.zip = value;
      }

      if (types.includes("country")) {
        address.country = value;
      }
    });

    return address;
  };

  const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
  fetch(url)
    .then((response) => response.json())
    .then((location) => {
      const place = location.results[0];
      const address = extractAddress(place).plain();
      setResult(address);
    });
  return result;
};
export default useReverseGeocode;
