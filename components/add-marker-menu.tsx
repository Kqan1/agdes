"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function AddMarkerMenu() {
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [donerdrone, setDonerdrone] = useState("");
    const [engelseviyesi, setEngelseviyesi] = useState("");
    const [sabitdrone, setSabitdrone] = useState("");
    const [type, setType] = useState("");
    const [afettype, setAfetType] = useState("");    
    const [yedekguc, setYedekguc] = useState("");
    const [ekipkisi, setEkipKisi] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/markers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    lat: parseFloat(lat), 
                    lng: parseFloat(lng),
                    donerdrone: parseInt(donerdrone),
                    engelseviyesi: parseInt(engelseviyesi),
                    sabitdrone: parseInt(sabitdrone),
                    type,
                    yedekguc: parseInt(yedekguc),
                    afettype,
                    ekipkisi,
                }),
            });
            if (response.ok) {
                // Marker başarıyla eklendi, formu sıfırla
                setLat("");
                setLng("");
                setDonerdrone("");
                setEngelseviyesi("");
                setSabitdrone("");
                setType("");
                setAfetType("");
                setYedekguc("");
                setEkipKisi("");
                location.reload();
            } else {
                // Hata durumunu işle
                console.error("Marker eklenirken bir hata oluştu");
            }
        } catch (error) {
            console.error("Marker eklenirken bir hata oluştu", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed bottom-6 right-14" size="icon" variant="outline">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni İşaret Ekle</DialogTitle>
                    <DialogDescription>
                        Yeni bir işaret eklemek için aşağıdaki formu doldurun.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lat" className="text-right">
                                Enlem
                            </Label>
                            <Input
                                id="lat"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                className="col-span-3"
                                type="number"
                                step="any"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lng" className="text-right">
                                Boylam
                            </Label>
                            <Input
                                id="lng"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                                className="col-span-3"
                                type="number"
                                step="any"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="donerdrone" className="text-right">
                                Döner Drone
                            </Label>
                            <Input
                                id="donerdrone"
                                value={donerdrone}
                                onChange={(e) => setDonerdrone(e.target.value)}
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="engelseviyesi" className="text-right">
                                Engel Seviyesi
                            </Label>
                            <Input
                                id="engelseviyesi"
                                value={engelseviyesi}
                                onChange={(e) => setEngelseviyesi(e.target.value)}
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sabitdrone" className="text-right">
                                Sabit Drone
                            </Label>
                            <Input
                                id="sabitdrone"
                                value={sabitdrone}
                                onChange={(e) => setSabitdrone(e.target.value)}
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Tip
                            </Label>
                            <Select onValueChange={setType} value={type}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Tip seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ISTASYON">Drone İstasyonu</SelectItem>
                                    <SelectItem value="ENGEL">Engel</SelectItem>
                                    <SelectItem value="EKIP">Ekip</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Afet Tipi
                            </Label>
                            <Select onValueChange={setAfetType} value={afettype}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Tip seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SEL">SEL</SelectItem>
                                    <SelectItem value="HEYELAN">HEYELAN</SelectItem>
                                    <SelectItem value="DEPREM">DEPREM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="yedekguc" className="text-right">
                                Yedek Güç
                            </Label>
                            <Input
                                id="yedekguc"
                                value={yedekguc}
                                onChange={(e) => setYedekguc(e.target.value)}
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ekipkisi" className="text-right">
                                Ekip Kişi Sayısı
                            </Label>
                            <Input
                                id="ekipkisi"
                                value={ekipkisi}
                                onChange={(e) => setEkipKisi(e.target.value)}
                                className="col-span-3"
                                type="number"
                                step="any"
                            />
                        </div>
                    </div>
                    <DialogTrigger asChild>
                        <Button type="submit">Ekle</Button>
                    </DialogTrigger>
                </form>
            </DialogContent>
        </Dialog>
    );
}