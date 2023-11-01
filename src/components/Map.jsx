import { useState } from "react";
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

const Map = () => {
  const [markerList, setMarkerList] = useState([
    { lat: 27.72, lng: 85.3579 },
    { lat: 27.70001, lng: 85.3579002 },
  ]);

  const CustomMarker = () => {
    useMapEvent("click", (e) =>
      setMarkerList((oldList) => [
        ...oldList,
        { lat: e.latlng.lat, lng: e.latlng.lng },
      ])
    );
    return null;
  };

  return (
    <MapContainer
      className="map"
      center={{ lat: 27.700379692577663, lng: 85.35719108777057 }}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker />

      <FeatureGroup>
        {markerList.map(({ lat, lng }, index) => {
          return (
            <Marker key={index} position={[lat, lng]}>
              <Popup>
                Latitute: {lat} and Longitude: {lng}
              </Popup>
            </Marker>
          );
        })}
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
