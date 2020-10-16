import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCuo1aabYnix0L3KnetsboMnZS4VaGgPAE",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `350px`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 40.90423, lng: 29.273753 }}>
    <Marker position={{ lat: 40.90423, lng: 29.273753 }} />
  </GoogleMap>
));
