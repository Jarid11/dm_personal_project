import React, { Component } from "react";

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const style = {
            width: '100%'
        }
        return (
            <Map google={this.props.google} style={style} initialCenter={{ lat: 40.032200, lng: -79.889741 }} zoom={16}>
                <Marker onClick={this.onMarkerClick}
                    name={'BugStuff'} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.GOOGLE_MAP_API_KEY)
})(MapContainer)