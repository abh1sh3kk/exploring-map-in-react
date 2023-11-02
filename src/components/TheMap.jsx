import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const TheMap = () => {
  const mapRef = useRef(null);
  // ----------------------------------------------------------
  let ktm = L.marker([27.72, 85.3579]).bindPopup("This is Kathmandu, Nepal"),
    ktm2 = L.marker([27.722, 85.359]).bindPopup("This is Kathmandu."),
    ktm3 = L.marker([27.724, 85.357]).bindPopup("This is Kathmandu, Nepal"),
    ktm4 = L.marker([27.72, 85.35]).bindPopup("This is Kathmandu, Nepal");
  const markerList = [ktm, ktm2, ktm3, ktm4];
  // ----------------------------------------------------------

  const [markersGroup, setMarkersGroup] = useState(markerList);
  let cities = L.layerGroup(markersGroup);

  useEffect(() => {
    const map = L.map(mapRef.current, { layers: cities }).setView(
      [27.72, 85.3579],
      14
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const addMarker = (e) => {
      setMarkersGroup((oldGroup) => {
        const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup(
          "This marker is just added"
        );
        console.log("new marker added on..", e.latlng.lat, e.latlng.lng);
        return [...oldGroup, newMarker];
      });
    };
    map.addEventListener("click", addMarker);
    return () => {
      map.removeEventListener("click", addMarker);
    };
  }, []);

  return (
    <div>
      <figure
        id="map"
        ref={mapRef}
        style={{ height: "800px", width: "800px" }}
      />
    </div>
  );
};

export default TheMap;
