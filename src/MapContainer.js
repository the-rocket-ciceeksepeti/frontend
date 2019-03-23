import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: 1350,
  height: 600,
  oveflow: "scroll"
};
let t = Math.PI / 2;
const data = [];

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  getLocation = () => {
    const loc = {
      lng: Number(28.88915), // lovely place
      lat: Number(41.020115)
    };
    if (!data.length) data.push(loc);
    const r =
      (Math.sin(t) * Math.sqrt(Math.abs(Math.cos(t)))) / (Math.sin(t) + 1.4) -
      2 * Math.sin(t) +
      2;
    t += 0.1;
    const tloc = {
      lat: loc.lat + 0.001 * r * Math.sin(t),
      lng: loc.lng + 0.001 * r * Math.cos(t)
    };
    if (data.includes(tloc) || data.length > 62) {
      this.props.onDelivered();
    } else data.push(tloc);
  };
  render() {
    if (!this.props.status) this.getLocation();
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={17}
          style={mapStyles}
          initialCenter={{
            lng: Number(28.88915), // lovely place
            lat: Number(41.020115)
          }}
        >
          {data.length &&
            data.map(d => (
              <Marker
                onClick={this.onMarkerClick}
                name={d.lat + ", " + d.lng}
                key={d.lat + ", " + d.lng}
                position={d}
              />
            ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDFz1mFqY6E2oiw5X661_Xnah9Wmofh1Ag"
})(MapContainer);
