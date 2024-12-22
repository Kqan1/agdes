import { useState, useEffect } from 'react';
import axios from 'axios';
import { marker } from '@prisma/client';
import { Ban, Flower, HardHat, LoaderCircle, MapPin, PlaneTakeoff, Zap } from 'lucide-react';

interface MarkerMenuProps {
    position: { lat: number; lng: number } | null;
};

interface MenuProps {
    pending: boolean;
    markerInfo: marker | null;
    position: { lat: number; lng: number } | null;
};

export default function MarkerMenu({ position }: MarkerMenuProps) {
    const [pending, setPending] = useState(false);
    const [markerInfo, setMarkerInfo] = useState<marker | null>(null);

    useEffect(() => {
        const fetchMarkerInfo = async () => {
            setPending(true);
            try {
                const response = await axios.get('http://localhost:3000/api/get-marker-info', {
                    params: {
                        lat: position?.lat,
                        lng: position?.lng,
                    },
                });
                console.log(response.data);
                setMarkerInfo(response.data);
            } catch (error) {
                console.error('Error fetching marker info:', error);
            } finally {
                setPending(false);
            };
        };

        if (position) {
            fetchMarkerInfo();
        };
    }, [position]);

    if ( markerInfo?.type === "EKIP" ) return <Ekip pending={pending} markerInfo={markerInfo} position={position} /> 
    if ( markerInfo?.type === "ENGEL" ) return <Engel pending={pending} markerInfo={markerInfo} position={position} />
    if ( markerInfo?.type === "ISTASYON" ) return <İstasyon pending={pending} markerInfo={markerInfo} position={position} />;
};

function İstasyon({ pending, markerInfo, position }: MenuProps) {
    return (
        <div className="fixed bottom-0 lg:bottom-auto lg:left-0 lg:top-0 w-full lg:w-80 flex flex-col items-center lg:justify-center gap-4 max-h-[80vh] lg:max-h-none lg:h-screen overflow-y-auto p-4 border-t-2 lg:border-t-0 lg:border-r-2 border-zinc-400 bg-white/70 shadow-lg rounded-t-lg lg:rounded-none lg:rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-800">İstasyon Verileri</h2>
            {pending ? 
            <div className="flex items-center gap-2 text-2xl text-gray-700">
                <LoaderCircle className="animate-spin" /> <p>Yükleniyor...</p>
            </div> : 
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700">Koordinatlar</h3>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Enlem: {position?.lat ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Boylam: {position?.lng ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700">İstasyon Verileri</h3>
                    <p className="text-gray-600 flex gap-1"><Flower />Aktif Drone: {markerInfo?.sabitdrone ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><PlaneTakeoff /> Dönerkanat Drone: {markerInfo?.donerdrone ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><Zap />Yedek Güç: {markerInfo?.yedekguc ?? 'N/A'}</p>
                </div>
            </div>}
        </div>
    );
};

function Engel({ pending, markerInfo, position }: MenuProps) {
    return (
        <div className="fixed bottom-0 lg:bottom-auto lg:left-0 lg:top-0 w-full lg:w-80 flex flex-col items-center lg:justify-center gap-4 max-h-[80vh] lg:max-h-none lg:h-screen overflow-y-auto p-4 border-t-2 lg:border-t-0 lg:border-r-2 border-zinc-400 bg-white/70 shadow-lg rounded-t-lg lg:rounded-none lg:rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-800">Hasarlı Konum Verileri</h2>
            {pending ? 
            <div className="flex items-center gap-2 text-2xl text-gray-700">
                <LoaderCircle className="animate-spin" /> <p>Yükleniyor...</p>
            </div> : 
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow w-full sm:w-72">
                    <h3 className="text-xl font-semibold text-gray-700">Koordinatlar</h3>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Enlem: {position?.lat ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Boylam: {position?.lng ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow w-full sm:w-72">
                    <h3 className="text-xl font-semibold text-gray-700">Engel Verileri</h3>
                    <p className="text-gray-600 flex gap-1"><HouseCrack /> Afet Tipi: {markerInfo?.afettype ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><Ban />Engel Seviyesi: {markerInfo?.engelseviyesi ?? 'N/A'}</p>
                </div>
            </div>}
        </div>
    );
};

function Ekip({ pending, markerInfo, position }: MenuProps) {
    return (
        <div className="fixed bottom-0 lg:bottom-auto lg:left-0 lg:top-0 w-full lg:w-80 flex flex-col items-center lg:justify-center gap-4 max-h-[80vh] lg:max-h-none lg:h-screen overflow-y-auto p-4 border-t-2 lg:border-t-0 lg:border-r-2 border-zinc-400 bg-white/70 shadow-lg rounded-t-lg lg:rounded-none lg:rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-800">Ekip Verileri</h2>
            {pending ? 
            <div className="flex items-center gap-2 text-2xl text-gray-700">
                <LoaderCircle className="animate-spin" /> <p>Yükleniyor...</p>
            </div> : 
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow w-full sm:w-72">
                    <h3 className="text-xl font-semibold text-gray-700">Koordinatlar</h3>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Enlem: {position?.lat ?? 'N/A'}</p>
                    <p className="text-gray-600 flex gap-1"><MapPin /> Boylam: {position?.lng ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 p-2 bg-white rounded-lg shadow w-full sm:w-72">
                    <h3 className="text-xl font-semibold text-gray-700">Engel Verileri</h3>
                    <p className="text-gray-600 flex gap-1"><HardHat /> Ekip Kişi Sayısı: {markerInfo?.ekipkisi ?? 'N/A'}</p>
                </div>
            </div>}
        </div>
    );
};

function HouseCrack() {
    return (
        <svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c.2 35.5-28.5 64.3-64 64.3l-122.1 0L288 448l80.8-67.3c7.8-6.5 7.6-18.6-.4-24.9L250.6 263.2c-14.6-11.5-33.8 7-22.8 22L288 368l-85.5 71.2c-6.1 5-7.5 13.8-3.5 20.5L230.4 512l-102.3 0c-35.3 0-64-28.7-64-64l0-160.4-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L416 100.7 416 64c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 121 52.8 46.4c8 7 12 15 11 24z"/></svg>
    )
};