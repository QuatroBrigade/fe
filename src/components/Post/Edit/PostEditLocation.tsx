import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { shallow } from "zustand/shallow";
import { usePostEditState } from "./PostEdit";

type PropsType = {};

import { icon } from "leaflet";

let markerIcon = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const _PostEditLocation = ({}: PropsType) => {
  const { setPost, post } = usePostEditState(
    ({ setPost, post }) => ({ setPost, post }),
    shallow
  );

  useMapEvents({
    click: (event) => {
      //map.locate()
      console.log(event.latlng);
      setPost("location", event.latlng);
    },
  });

  console.log(post.location);

  return (
    <>
      {post.location && (
        <Marker position={post.location} icon={markerIcon}></Marker>
      )}
    </>
  );
};

export default function PostEditLocation() {
  return (
    <div>
      <p className="mb-1 font-medium">
        Vyberte miesto <span className="text-red">*</span>
      </p>
      <div className="overflow-hidden relative rounded pr-8">
        <MapContainer
          center={{ lat: 48.720484, lng: 21.257623 }}
          zoom={14}
          style={{ height: "25rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <_PostEditLocation />
        </MapContainer>
      </div>
    </div>
  );
}
