import { useEffect, useRef, useState } from "react";
import "../styles/Likes.scss";
import { getVisitorToken } from "../utils/visitorToken";

type Float = { id: number; x: number };

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function Likes() {
    const [serverTotal, setServerTotal] = useState(0);   // last confirmed DB total
    const [localDelta, setLocalDelta] = useState(0);     // optimistic taps not yet flushed
    const [visitorCount, setVisitorCount] = useState(0);
    const [popped, setPopped] = useState(false);
    const [floats, setFloats] = useState<Float[]>([]);
    const [loaded, setLoaded] = useState(false);

    const pendingRef = useRef(0);          // taps buffered for next flush
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFlushing = useRef(false);      // true while POST is in-flight

    // Displayed total = server total + any un-flushed local taps
    const displayTotal = serverTotal + localDelta;

    // ----------------------------------------------------------------
    // Bootstrap — fetch initial counts + open SSE
    // ----------------------------------------------------------------
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
                    // Once server confirms, clear the local delta
                    // (only if we're not mid-flush to avoid flicker)
                    if (!isFlushing.current) {
                        setLocalDelta(0);
                    }
                }
            } catch { /* ignore */ }
        };

        es.onerror = () => es.close();
        return () => es.close();
    }, []);

    // ----------------------------------------------------------------
    // Flush — batch POST after user goes idle for 1 s
    // ----------------------------------------------------------------
    const flushLikes = async () => {
        const count = pendingRef.current;
        if (count === 0) return;

        pendingRef.current = 0;
        isFlushing.current = true;

        const token = getVisitorToken();
        try {
            await fetch(`${API_BASE}/api/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, count }),
            });
            // SSE will push the new server total → serverTotal updates
            // then we zero out localDelta so display stays stable
            setLocalDelta(0);
        } catch {
            // Network error — keep localDelta so the number doesn't jump
        } finally {
            isFlushing.current = false;
        }
    };

    // ----------------------------------------------------------------
    // Tap handler
    // ----------------------------------------------------------------
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