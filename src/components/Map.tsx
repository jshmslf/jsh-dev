import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "../styles/Map.scss";

const LAT = 15.8949;
const LNG = 120.2863;

function getPHTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });
}

function isDay(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 6 && hour < 18;
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="location-card__time-icon">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="location-card__time-icon">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LocationCard() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const [time, setTime] = useState<Date>(() => getPHTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getPHTime()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return;

    let mounted = true;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mounted || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [LAT, LNG],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        attributionControl: false,
      });

      L.tileLayer(
        `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${import.meta.env.VITE_STADIA_API_KEY}`,
        { maxZoom: 20, attribution: "" }
      ).addTo(map);

      const labelHtml = `
        <div style="
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(15,15,17,0.85);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          padding: 3px 8px;
          white-space: nowrap;
          backdrop-filter: blur(4px);
        ">
          <span style="
            font-family: 'Geist Mono', monospace;
            font-size: 11px;
            color: rgba(255,255,255,0.85);
            letter-spacing: 0.02em;
          ">Pangasinan</span>
        </div>`;

      const icon = L.divIcon({
        html: labelHtml,
        className: "",
        iconAnchor: [54, 12],
      });

      L.marker([LAT, LNG], { icon }).addTo(map);
      mapInstanceRef.current = map;
    })();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const day = isDay(time);

  return (
    <div className="location-card">
      <div className="location-card__header">
        <span className="location-card__label">Currently Based In</span>
      </div>

      <div className="location-card__map-wrapper">
        <div className="location-card__map" ref={mapRef} />
      </div>

      <div className="location-card__footer">
        <span className="location-card__location">Pangasinan, PH</span>
        <div className="location-card__time-wrapper">
          {day ? <SunIcon /> : <MoonIcon />}
          <span className="location-card__time">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}