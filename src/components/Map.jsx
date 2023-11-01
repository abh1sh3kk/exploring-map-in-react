import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState([
    27.700379692577663, 85.35719108777057,
  ]);

  const CustomMarker = () => {
    useMapEvent("click", (e) =>
      setMarkerPosition([e.latlng.lat, e.latlng.lng])
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
      <Marker position={markerPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
