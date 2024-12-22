import axios from 'axios';
import type { Loader as LoaderType } from "@googlemaps/js-api-loader";

interface addMarkerProps {
    loader: LoaderType;
    map: google.maps.Map | null;
    position: { lat: number; lng: number; };
    onMarkerClick: (position: { lat: number; lng: number }) => void;
};

export default async function AddMarker({ loader, map, position, onMarkerClick }: addMarkerProps) {
    const { Marker } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;

    function selectIcon(type: string) {
        switch (type) {
            case "ENGEL":
                return "/yol-tıkalı.svg";
            case "ISTASYON":
                return "/istasyon.svg";
            case "EKIP":
                return "/ekip.svg";
            default:
                break;
        }
    };

    try {
        const response = await axios.get(`/api/get-marker-info?lat=${position.lat}&lng=${position.lng}`);
        const dbMarker = response.data;

        const marker = new Marker({
            map: map,
            position: position,
            clickable: true,
            icon: selectIcon(dbMarker?.type),
        });
        marker.addListener("click", () => {
            onMarkerClick({ lat: position.lat, lng: position.lng });
        });
    } catch (error) {
        console.error('Marker eklenirken hata oluştu:', error);
    }
};