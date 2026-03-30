import { useEffect, useRef, useState } from "react"
import '../styles/Likes.scss';
import CountUp from "./CountUp";

type Float = { id: number; x: number };

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const ABACUS_STREAM = "https://abacus.jasoncameron.dev/stream/jshmslf.is-a.dev/portfolio-likes";

function Likes() {
    const [likes, setLikes] = useState(0);
    const [visitorCount, setVisitorCount] = useState(0);
    const [popped, setPopped] = useState(false);
    const [floats, setFloats] = useState<Float[]>([]);
    const eventSourceRef = useRef<EventSource | null>(null);
    const [loaded, setLoaded] = useState(false);

    // ↓ replace this entire useEffect
    useEffect(() => {
        fetch(`${API_BASE}/api/like`)
            .then(r => r.json())
            .then(data => {
                setLikes(data.total_likes ?? 0);
                setVisitorCount(data.visitor_likes ?? 0);
                setLoaded(true);  // ← mark as ready
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
            } catch {
                // ignore malformed frames
            }
        };

        es.onerror = () => {
            es.close();
        };

        eventSourceRef.current = es;

        return () => es.close();
    }, []);
    // ↑ end of replacement

    const handleLike = async () => {
        setPopped(true);
        const id = Date.now();
        const x = Math.random() * 40 - 20;
        setFloats(prev => [...prev, { id, x }]);

        setTimeout(() => {
            setPopped(false);
            setFloats(prev => prev.filter(f => f.id !== id));
        }, 600);

        const res = await fetch(`${API_BASE}/api/like`, { method: "POST" });
        const data = await res.json();

        if (data.total_likes !== undefined) {
            setLikes(data.total_likes);
            setVisitorCount(data.visitor_likes);
        }
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