import { useQuery } from "@tanstack/react-query";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetcher, getApi2Route } from "lib/msic/fetcher";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import { PostType } from "types/post";

type PropsType = {
  location: { lat: number; lng: number };
};

let markerIcon = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const _MapPoint = ({ location }: PropsType) => {
  return <Marker position={location} icon={markerIcon}></Marker>;
};

export default function MapPoint({
  postId,
  location,
}: PropsType & { postId: PostType["id"] }) {
  // console.log(location);

  const { data: polygons } = useQuery(
    ["post", postId, "location", "polygon"],
    async () => {
      return await fetcher<Array<Array<[number, number]>>>(
        getApi2Route(
          `/api/map/route/startX/${location.lng}/startY/${location.lat}`
        )
      );
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      select: (data) => {
        return data.length > 0
          ? data[0].map(([lng, lat]) => [lat, lng] as [number, number])
          : [];
      },
    }
  );

  console.log(polygons);

  return (
    <div className="overflow-hidden relative rounded pr-8">
      <MapContainer center={location} zoom={14} style={{ height: "25rem" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygons && (
          <Polygon pathOptions={{ fillColor: "blue" }} positions={polygons} />
        )}
        <_MapPoint location={location} />
      </MapContainer>
    </div>
  );
}
