// import React, { useEffect, useRef, useState } from "react";
// import { MdOutlineGpsFixed } from "react-icons/md";

// const apiKey = process.env.REACT_APP_MAP_API;

// const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
// console.log(apiKey, "key");
// // load google map api js

// function loadAsyncScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     Object.assign(script, {
//       type: "text/javascript",
//       async: true,
//       src,
//     });
//     console.log("src", src);
//     script.addEventListener("load", () => resolve(script));
//     document.head.appendChild(script);
//   });
// }

// const extractAddress = (place) => {
//   const address = {
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     plain() {
//       const city = this.city ? this.city + ", " : "";
//       const zip = this.zip ? this.zip + ", " : "";
//       const state = this.state ? this.state + ", " : "";
//       return city + zip + state + this.country;
//     },
//   };

//   if (!Array.isArray(place?.address_components)) {
//     return address;
//   }

//   place.address_components.forEach((component) => {
//     const types = component.types;
//     const value = component.long_name;

//     if (types.includes("locality")) {
//       address.city = value;
//     }

//     if (types.includes("administrative_area_level_2")) {
//       address.state = value;
//     }

//     if (types.includes("postal_code")) {
//       address.zip = value;
//     }

//     if (types.includes("country")) {
//       address.country = value;
//     }
//   });

//   return address;
// };

// function LocationInput() {
//   const searchInput = useRef(null);
//   const [address, setAddress] = useState({});

//   // init gmap script
//   const initMapScript = () => {
//     // if script already loaded
//     if (window.google) {
//       return Promise.resolve();
//     }
//     const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//     return loadAsyncScript(src);
//   };

//   // do something on address change
//   const onChangeAddress = (autocomplete) => {
//     const place = autocomplete.getPlace();
//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

//     setAddress(extractAddress(place));
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.results.length > 0) {
//           const formattedAddress = data.results[0].formatted_address;
//           console.log(formattedAddress, "formated"); // Output: "Thripunithura, Kerala, India"
//         } else {
//           console.log("No results found");
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   // init autocomplete
//   const initAutocomplete = () => {
//     if (!searchInput.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       searchInput.current
//     );
//     autocomplete.setFields(["address_component", "geometry"]);
//     autocomplete.addListener("place_changed", () =>
//       onChangeAddress(autocomplete)
//     );
//   };

//   const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
//     const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//     searchInput.current.value = "Getting your location...";
//     fetch(url)
//       .then((response) => response.json())
//       .then((location) => {
//         const place = location.results[0];
//         const _address = extractAddress(place);
//         setAddress(_address);
//         searchInput.current.value = _address.plain();
//       });
//   };

//   const findMyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         console.log(position.coords);
//         reverseGeocode(position.coords);
//       });
//     }
//   };

//   // load map script after mounted
//   useEffect(() => {
//     initMapScript().then(() => initAutocomplete());
//   }, []);

//   return (
//     <div className="App">
//       <div>
//         <div className="search">
//           <input
//             ref={searchInput}
//             type="text"
//             placeholder="Search location...."
//           />
//           <button onClick={findMyLocation}>
//             <MdOutlineGpsFixed />
//           </button>
//         </div>

//         <div className="address">
//           <p>
//             City: <span>{address.city}</span>
//           </p>
//           <p>
//             State: <span>{address.state}</span>
//           </p>
//           <p>
//             Zip: <span>{address.zip}</span>
//           </p>
//           <p>
//             Country: <span>{address.country}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LocationInput;

import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { MdOutlineGpsFixed } from "react-icons/md";

const LocationInput = (props) => {
  const apiKey = "AIzaSyB1gs_45smkaCkjq_MbAhX-5NIaJ6erplo";
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState("Location..");

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

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const address = extractAddress(place).plain();
        setPlaceholder(address);
      });
  };

  const findMyLocation = () => {
    setPlaceholder("Getting Location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (props.locationSearch) {
          props.setLocation({ coordinates: [latitude, longitude] });
        } else if (props.post) {
          props.setPostData({
            ...props.postData,
            location: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
          });
        } else {
          props.setFormData({
            ...props.formData,
            location: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
          });
        }
        reverseGeocode(position.coords);
      });
    }
  };
  const handleSelect = async (place) => {
    console.log(place, "place");
    setPlaceholder(place.label);
    if (place && place.value && place.value.place_id) {
      try {
        const results = await geocodeByPlaceId(place.value.place_id);
        const { lat, lng } = results[0].geometry.location.toJSON();
        if (props.locationSearch) {
          props.setLocation({ coordinates: [lat, lng] });
        } else if (props.post) {
          props.setPostData({
            ...props.postData,
            location: {
              type: "Point",
              coordinates: [lat, lng],
            },
          });
        } else {
          props.setFormData({
            ...props.formData,
            location: {
              type: "Point",
              coordinates: [lat, lng],
            },
          });
        }
      } catch (error) {
        console.error(error, " from api");
      }
    }
  };

  return (
    <div className="relative">
      <GooglePlacesAutocomplete
        apiKey="AIzaSyB1gs_45smkaCkjq_MbAhX-5NIaJ6erplo"
        selectProps={{
          value,
          onChange: handleSelect,
          onSelect: handleSelect,
          placeholder,

          className: "block w-full px-4 py-2 text-slate-400",
        }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["in"],
          },
        }}
      />
      <button
        type="button"
        className="text-lg absolute top-5 right-6"
        onClick={findMyLocation}
      >
        <MdOutlineGpsFixed />
      </button>
    </div>
  );
};
export default LocationInput;
