import { useEffect, useRef, useState } from "react";
import "../styles/Likes.scss";
import { getVisitorToken } from "../utils/visitorToken";

type Float = { id: number; x: number };

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function Likes() {
    const [serverTotal, setServerTotal] = useState(0);
    const [localDelta, setLocalDelta] = useState(0);
    const [visitorCount, setVisitorCount] = useState(0);
    const [popped, setPopped] = useState(false);
    const [floats, setFloats] = useState<Float[]>([]);
    const [loaded, setLoaded] = useState(false);

    const pendingRef = useRef(0);       // taps not yet sent to server
    const flushedRef = useRef(0);       // taps sent but not yet confirmed by SSE
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const displayTotal = serverTotal + localDelta;

    useEffect(() => {
        const token = getVisitorToken();

        fetch(`${API_BASE}/api/like?token=${token}`)
            .then((r) => r.json())
            .then((data) => {
                setServerTotal(data.total_likes ?? 0);
                setVisitorCount(data.visitor_likes ?? 0);
                setLoaded(true);
            })
            .catch(() => setLoaded(true));

        const es = new EventSource(`${API_BASE}/api/like/stream`);

        es.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (typeof data.total === "number") {
                    setServerTotal(data.total);
                    // Subtract only the confirmed flushed amount from localDelta
                    // pendingRef taps are still in-flight locally, keep them
                    setLocalDelta((d) => {
                        const confirmed = flushedRef.current;
                        flushedRef.current = 0;
                        return Math.max(0, d - confirmed);
                    });
                }
            } catch { /* ignore */ }
        };

        es.onerror = () => es.close();
        return () => es.close();
    }, []);

    const flushLikes = async () => {
        const count = pendingRef.current;
        if (count === 0) return;

        pendingRef.current = 0;
        flushedRef.current += count; // mark as in-flight

        const token = getVisitorToken();
        try {
            await fetch(`${API_BASE}/api/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, count }),
            });
            // SSE push will arrive and subtract flushedRef from localDelta
        } catch {
            // On error, roll back flushedRef so delta stays visible
            flushedRef.current -= count;
        }
    };

    const handleLike = () => {
        setPopped(true);
        setLocalDelta((d) => d + 1);
        setVisitorCount((v) => v + 1);

        const id = Date.now();
        const x = Math.random() * 40 - 20;
        setFloats((prev) => [...prev, { id, x }]);
        setTimeout(() => {
            setPopped(false);
            setFloats((prev) => prev.filter((f) => f.id !== id));
        }, 600);

        pendingRef.current += 1;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(flushLikes, 1000);
    };

    return (
        <div className="card likes">
            <div className="like-count">
                {loaded && (
                    <span className="text-4xl">{displayTotal.toLocaleString()}</span>
                )}
            </div>

            <div className="like-action">
                <div className="float-layer">
                    {floats.map((f) => (
                        <span
                            key={f.id}
                            className="float"
                            style={{ left: `calc(25% + ${f.x}px)` }}
                        >
                            +1
                        </span>
                    ))}
                </div>

                <button
                    className={`like-btn ${popped ? "pop" : ""} hover-translate`}
                    onClick={handleLike}
                    aria-label="Give A Like To My Portfolio"
                >
                    TAP ME
                </button>
            </div>
            <p className="hint">you've tapped {visitorCount.toLocaleString()} times</p>
        </div>
    );
}

export default Likes;