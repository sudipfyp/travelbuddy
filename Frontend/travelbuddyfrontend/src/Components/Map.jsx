import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import Icon from "../Assets/images/map.png" 

function Map({ onLocationChange, onPositionChange, onDistrictChange }) {
  const mapRef = useRef(null); // Reference to the map instance
  const [position, setPosition] = useState([27.6933917, 85.2923934]); // initial position
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    const fetchLocationName = async () => {
      const response = await fetch(
        // `https://api.opencagedata.com/geocode/v1/json?q=${position[0]}+${position[1]}&key=12fb8a882afb473aafcc3be8ea7267cb`
        `https://route-init.gallimap.com/api/v1/reverse/generalReverse?accessToken=a66d666f-068e-432d-a5d1-bb93355fd045&lat=${position[0]}&lng=${position[1]}`
      );
      const data = await response.json();
      setLocation(data.data.generalName);
      setDistrict(data.data.district);
      onLocationChange(data.data.generalName);
      onDistrictChange(data.data.district);
    };

    fetchLocationName();
  }, [position, onLocationChange, onDistrictChange]);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      mapInstance.on('moveend', () => {
        const center = mapInstance.getCenter();
        setPosition([center.lat, center.lng]);
        onPositionChange([center.lat, center.lng]);
      });
      console.log(position);
    }
  }, [position, onPositionChange]);

  return (
    <>
    <MapContainer center={position} zoom={12} style={{ height: "75vh" }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position}>
          <Popup>
            Latitude: {position[0]} <br />
            Longitude: {position[1]} <br />
            Location: {location}
          </Popup>
        </Marker>
      )}
    </MapContainer>

    <div style={
      {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999'
      }
    
    }>
      <img src={Icon} alt="icon" width={'25px'}/>
    </div>
    </>
  );
}

export default Map;
