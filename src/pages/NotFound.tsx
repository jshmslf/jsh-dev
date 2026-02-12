import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/NotFound.scss";

function NotFound() {
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const fullPath = location.pathname;
    const [displayedPath, setDisplayedPath] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [command, setCommand] = useState("");
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    // Type animation for invalid path
    useEffect(() => {
        terminalBodyRef.current?.scrollTo({
            top: terminalBodyRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedPath(fullPath.slice(0, i));
            i++;
            if (i > fullPath.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [fullPath]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = command.trim().toLowerCase();
        let output = "";

        switch (trimmed) {
            case "help":
                output = `
available commands:
- help      → list commands
- whoami    → about me
- codes     → view projects
- close     → return home
                `;
                break;

            case "whoami":
                output = "Joshua Verceles, Software Engineer.";
                break;

            case "codes":
                output = "redirecting to /#projects ...";
                setTimeout(() => navigate("/#projects"), 800);
                break;

            case "close":
                navigate("/");
                return;

            default:
                output = `bash: ${trimmed}: command not found`;
        }

        setHistory(prev => [...prev, `jsh@portfolio:~$ ${trimmed}`, output]);
        setCommand("");
    };

    return (
        <main className="notfound">
            <div className="terminal">
                <div className="terminal-header">
                    <div className="dots">
                        <span className="dot red" onClick={() => navigate("/")} title="Close"/>
                        <span className="dot yellow" />
                        <span className="dot green" />

                        <div className="terminal-title">
                            jsh@portfolio — 404
                        </div>
                    </div>
                </div>

                <div className="terminal-body" ref={terminalBodyRef}>
                    <p>
                        <span className="prompt">jsh@portfolio:~$</span> cd {displayedPath}
                    </p>

                    <p className="error">
                        bash: {fullPath}: No such file or directory
                    </p>

                    {history.map((line, i) => (
                        <pre key={i} className="terminal-line">
                            {line}
                        </pre>
                    ))}

                    <form onSubmit={handleCommand} className="command-form">
                        <span className="prompt">jsh@portfolio:~$</span>

                        <div className="input-wrapper" onClick={() => inputRef.current?.focus()}>
                            <span className="fake-input">
                                {command}
                                <span className="fake-cursor" />
                            </span>

                            <input
                                ref={inputRef}
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                className="real-input"
                                autoComplete="off"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default NotFound;
