import { useEffect, useRef, useState } from "react"
import '../styles/Likes.scss';
import CountUp from "./CountUp";
import { getVisitorToken } from "../utils/visitorToken";

type Float = { id: number; x: number };

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const ABACUS_STREAM = "https://abacus.jasoncameron.dev/stream/jshmslf.is-a.dev/portfolio-likes";

function Likes() {
    const [likes, setLikes] = useState(0);
    const [visitorCount, setVisitorCount] = useState(0);
    const [popped, setPopped] = useState(false);
    const [floats, setFloats] = useState<Float[]>([]);
    const [loaded, setLoaded] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    // Debounce refs — batch pending taps
    const pendingRef = useRef(0);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const token = getVisitorToken();

        fetch(`${API_BASE}/api/like?token=${token}`)
            .then(r => r.json())
            .then(data => {
                setLikes(data.total_likes ?? 0);
                setVisitorCount(data.visitor_likes ?? 0);
                setLoaded(true);
            })
            .catch(() => {
                setLikes(0);
                setVisitorCount(0);
                setLoaded(true);
            });

        const es = new EventSource(ABACUS_STREAM);
        es.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (typeof data.value === "number") {
                    setLikes(data.value);
                }
            } catch { /* ignore */ }
        };
        es.onerror = () => es.close();
        eventSourceRef.current = es;

        return () => es.close();
    }, []);

    // Flush pending taps to backend after user stops for 1s
    const flushLikes = () => {
        const count = pendingRef.current;
        if (count === 0) return;
        pendingRef.current = 0;

        const token = getVisitorToken();
        fetch(`${API_BASE}/api/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, count }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.total_likes !== undefined) {
                    setLikes(data.total_likes);
                    setVisitorCount(data.visitor_likes);
                }
            })
            .catch(() => { /* keep optimistic value */ });
    };

    const handleLike = () => {
        // Optimistic UI — instant, no waiting
        setPopped(true);
        setLikes(prev => prev + 1);
        setVisitorCount(prev => prev + 1);

        const id = Date.now();
        const x = Math.random() * 40 - 20;
        setFloats(prev => [...prev, { id, x }]);
        setTimeout(() => {
            setPopped(false);
            setFloats(prev => prev.filter(f => f.id !== id));
        }, 600);

        // Accumulate taps
        pendingRef.current += 1;

        // Reset debounce timer — flush 1s after last tap
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(flushLikes, 1000);
    };

    return (
        <div className="card likes">
            <div className="like-count">
                {loaded && (
                    <CountUp
                        from={0}
                        to={likes}
                        separator=","
                        direction="up"
                        duration={1}
                        className="text-4xl"
                        delay={0.75}
                    />
                )}
            </div>

            <div className="like-action">
                <div className="float-layer">
                    {floats.map(f => (
                        <span
                            key={f.id}
                            className="float"
                            style={{ left: `calc(25% + ${f.x}px)` }}
                        >+1</span>
                    ))}
                </div>

                <button
                    className={`like-btn ${popped ? "pop" : ""}, hover-translate`}
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