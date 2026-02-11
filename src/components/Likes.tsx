import { useEffect, useState } from "react"
import '../styles/Likes.scss';
import { supabase } from "../supabase"

type Float = {
    id: number;
    x: number;
};

function Likes() {
    const [likes, setLikes] = useState(0);
    const [visitorCount, setVisitorCount] = useState(0);
    const [popped, setPopped] = useState(false);
    const [floats, setFloats] = useState<Float[]>([]);

    const getVisitorId = () => {
        let id = localStorage.getItem("visitor_id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("visitor_id", id);
        }
        return id;
    }

    useEffect(() => {
        const fetchLikes = async () => {
            const visitorId = getVisitorId();

            const { data: totalData } = await supabase
                .from("likes_total")
                .select("count")
                .eq("id", true)
                .single();
            
            if (totalData) {
                setLikes(totalData.count);
            }
            
            const { data: visitorData } = await supabase
                .from("likes_visitors")
                .select("count")
                .eq("visitor_id", visitorId)
                .single();
            
            if (visitorData) {
                setVisitorCount(visitorData.count);
            }
        };

        fetchLikes();
    }, []);

    const handleLike = async () => {
        const visitorId = getVisitorId();

        setPopped(true);
        const id = Date.now();
        const x = Math.random() * 40 - 20;
        setFloats((prev) => [...prev, { id, x }]);

        setTimeout(() => {
            setPopped(false);
            setFloats((prev) => prev.filter((f) => f.id !== id));
        }, 600);

        const { data, error } = await supabase.rpc("give_like", {
            v_visitor_id: visitorId,
        });

        if (!error && data && data.length > 0) {
            setLikes(data[0].total_likes);
            setVisitorCount(data[0].visitor_likes);
        } else {
            console.error(error);
        }
    };

    return (
        <div className="card likes">
            <div className="like-count">
                {likes.toLocaleString()}
            </div>

            <div className="like-action">
                <div className="float-layer">
                    {floats.map(f => (
                        <span
                            key={f.id}
                            className="float"
                            style={{left: `calc(25% + ${f.x}px)`}}
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
    )
}

export default Likes