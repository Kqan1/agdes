"use client";
import AddMarker from "@/utils/add-marker";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import MarkerMenu from "./marker-menu";
import React from 'react';
import AddMarkerMenu from "@/components/add-marker-menu";

interface Marker {
    id: string;
    lat: string;
    lng: string;
    engelseviyesi: number;
    sabitdrone: number;
    donerdrone: number;
    yedekguc: number;
    type: 'ISTASYON' | 'ENGEL';
}

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [loader, setLoader] = useState<Loader | null>(null);

    const [selectedMarker, setSelectedMarker] = useState<null | { lat: number; lng: number }>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [markers, setMarkers] = useState<Marker[]>([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await fetch('/api/markers');
                if (!response.ok) {
                    throw new Error('Failed to fetch markers');
                }
                const data = await response.json();
                setMarkers(data);
            } catch (error) {
                console.error('Error fetching markers:', error);
            }
        };

        fetchMarkers();
    }, []);

    useEffect(() => {
        const initLoader = () => {
            const newLoader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
            });
            setLoader(newLoader);
        };

        initLoader();
    }, []);

    useEffect(() => {
        const initMap = async () => {
            if (!loader || !mapRef.current) return;

            const { Map } = await loader.importLibrary("maps");

            const mapOptions: google.maps.MapOptions = {
                center: {
                    lat: 40.26973110263451,
                    lng: 40.22661770644792,
                },
                zoom: 16,
                mapId: "myId",
                fullscreenControl: false,
                clickableIcons: false,
            };

            const newMap = new Map(mapRef.current, mapOptions);
            setMap(newMap);
            console.log("Map initialized");
        };

        if (loader && !map) {
            initMap();
        }
    }, [loader, map]);

    useEffect(() => {
        if (!map || !loader || markers.length === 0) return;

        markers.forEach(marker => {
            AddMarker({
                loader,
                map,
                position: { 
                    lat: parseFloat(marker.lat), 
                    lng: parseFloat(marker.lng) 
                },
                onMarkerClick: handleMarkerClick
            });
        });
    }, [map, loader, markers]);

    const handleMarkerClick = (markerPosition: { lat: number; lng: number }) => {
        console.log("Marker clicked:", markerPosition);
        setSelectedMarker(markerPosition);
        setMenuVisible(true);
    };

    return (
        <>
            <div ref={mapRef} className="w-full h-screen"/>
            {menuVisible && <MarkerMenu position={selectedMarker} />}
            <AddMarkerMenu />
        </>
    );
};