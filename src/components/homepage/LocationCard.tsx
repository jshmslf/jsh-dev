"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "./Card";

const LAT = 15.8949;
const LNG = 120.2863;

export function LocationCard() {
  const [time, setTime] = useState("");
  const mapInitialized = useRef(false);

  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const mapRef = useCallback((el: HTMLDivElement | null) => {
    if (!el || mapInitialized.current) return;
    mapInitialized.current = true;

    import("leaflet").then((L) => {
      if ((el as HTMLDivElement & { _leaflet_id?: number })._leaflet_id) return;

      if (!document.querySelector("link[href*='leaflet']")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const map = L.map(el, {
        center: [LAT, LNG],
        zoom: 9,
        minZoom: 8,
        maxZoom: 14,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd" }
      ).addTo(map);
    });
  }, []);

  return (
    <Card title="Currently Based In">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          ref={mapRef}
          style={{ height: "180px", borderRadius: "var(--ui-radius)", overflow: "hidden" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--foreground)", fontWeight: 500 }}>
            Pangasinan, PH
          </span>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "6px" }}>
            {(() => {
              const hour = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })).getHours();
              if (hour >= 5 && hour < 12)  return "🌅";
              if (hour >= 12 && hour < 17) return "☀️";
              if (hour >= 17 && hour < 21) return "🌆";
              return "🌙";
            })()}
            {time}
          </span>
        </div>
      </div>
    </Card>
  );
}
